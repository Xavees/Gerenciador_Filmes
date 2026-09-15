# ==========================================
# Stage 1: Build Dependencies
# ==========================================
FROM node:22-alpine AS dependencies

WORKDIR /app

# Install all dependencies (including devDependencies needed to build TypeScript)
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# Stage 2: Production Dependencies
# ==========================================
FROM node:22-alpine AS production-deps

WORKDIR /app

# Install only production dependencies to minimize image size
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ==========================================
# Stage 3: Builder Stage
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependencies and source code
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json tsconfig.json ./
COPY src ./src
COPY config ./config

# Compile TypeScript to JavaScript (outputs to ./dist)
RUN npm run build

# ==========================================
# Stage 4: Production Runtime
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Production environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    NODE_CONFIG_DIR=/app/dist/config

# Create app and logs directory with node user ownership
RUN mkdir -p /app/logs && chown -R node:node /app

# Security: Copy files with non-root user permissions
# The 'node' user is pre-configured in official Alpine Node images
COPY --chown=node:node --from=production-deps /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node package.json ./

# Switch to non-root user
USER node

# Expose application port
EXPOSE 3000

# Health check using Alpine's built-in wget
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/test || exit 1

# Start the application
CMD ["node", "dist/src/app.js"]
