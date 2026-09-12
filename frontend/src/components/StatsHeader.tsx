import React from 'react';
import { Film, Star, Trophy, ArrowUpDown, Filter } from 'lucide-react';
import type { Movie } from '../types/movie';

interface StatsHeaderProps {
  movies: Movie[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
  movies,
  selectedFilter,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  const totalMovies = movies.length;
  const avgRating = totalMovies > 0
    ? (movies.reduce((sum, m) => sum + (Number(m.rating) || 0), 0) / totalMovies).toFixed(1)
    : '0.0';

  const topMovie = totalMovies > 0
    ? [...movies].sort((a, b) => b.rating - a.rating)[0]
    : null;

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}>
        {/* Metric 1 */}
        <div className="glass-panel" style={{
          padding: '18px 22px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)',
          }}>
            <Film size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Catálogo Total
            </span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {totalMovies} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>filmes</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel" style={{
          padding: '18px 22px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(251, 191, 36, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
          }}>
            <Star size={22} fill="#fbbf24" />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Média de Avaliação
            </span>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {avgRating} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ 10</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{
          padding: '18px 22px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(99, 102, 241, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#818cf8',
          }}>
            <Trophy size={22} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Maior Nota
            </span>
            <div style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {topMovie ? topMovie.title : 'Nenhum filme'}
              {topMovie && (
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', marginLeft: 6 }}>
                  ★ {topMovie.rating}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        padding: '12px 18px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(22, 29, 44, 0.4)',
        border: '1px solid var(--border-subtle)',
      }}>
        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginRight: 4 }}>
            <Filter size={14} /> Filtros:
          </span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'top_rated', label: '⭐ Nota 8.0+' },
            { id: 'mid_rated', label: 'Nota 5.0 - 7.9' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              style={{
                background: selectedFilter === f.id ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedFilter === f.id ? '#000' : 'var(--text-secondary)',
                fontWeight: selectedFilter === f.id ? 700 : 500,
                border: `1px solid ${selectedFilter === f.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowUpDown size={14} /> Ordenar:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.82rem',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="newest">Mais recentes</option>
            <option value="rating_desc">Maior nota</option>
            <option value="rating_asc">Menor nota</option>
            <option value="title_asc">Título (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
