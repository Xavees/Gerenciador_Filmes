import React, { useState } from 'react';
import { Star, User, Edit3, Trash2, ImageOff } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="glass-panel-interactive animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Poster Media Header */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '135%', // ~3:4 / 2:3 aspect ratio
        backgroundColor: '#0d1117',
        overflow: 'hidden',
      }}>
        {!imageError && movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            onError={() => setImageError(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform var(--transition-normal)',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 20,
            textAlign: 'center',
            background: 'linear-gradient(180deg, #161f30 0%, #0d121c 100%)',
            color: 'var(--text-muted)',
          }}>
            <ImageOff size={36} strokeWidth={1.5} />
            <span style={{ fontSize: '0.85rem' }}>Sem pôster disponível</span>
          </div>
        )}

        {/* Rating Badge Overlay */}
        <div style={{
          position: 'absolute',
          top: 14,
          right: 14,
          zIndex: 2,
        }}>
          <span className="rating-badge" style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            {Number(movie.rating).toFixed(1)}
          </span>
        </div>

        {/* Action Overlay buttons */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          display: 'flex',
          gap: 6,
          zIndex: 2,
        }}>
          <button
            className="btn-icon"
            onClick={() => onEdit(movie)}
            title="Editar filme"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(15, 23, 42, 0.75)',
            }}
          >
            <Edit3 size={15} />
          </button>
          <button
            className="btn-icon danger"
            onClick={() => onDelete(movie)}
            title="Excluir filme"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(15, 23, 42, 0.75)',
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Subtle Dark Gradient at bottom of image */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(16, 21, 34, 0.95), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: 12,
      }}>
        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.3,
        }}>
          {movie.title}
        </h3>

        {/* Director */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.84rem',
          color: 'var(--text-secondary)',
        }}>
          <User size={14} color="var(--accent-gold)" />
          <span>Direção: <strong>{movie.director}</strong></span>
        </div>

        {/* Starring */}
        {movie.stars && movie.stars.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {movie.stars.slice(0, 3).map((star, i) => (
              <span key={i} style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                {star}
              </span>
            ))}
            {movie.stars.length > 3 && (
              <span style={{
                fontSize: '0.72rem',
                padding: '2px 6px',
                color: 'var(--text-muted)',
              }}>
                +{movie.stars.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginTop: 'auto',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {movie.description}
        </p>
      </div>
    </article>
  );
};
