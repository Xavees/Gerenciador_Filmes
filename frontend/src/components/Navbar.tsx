import React from 'react';
import { Film, Plus, Search } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenAddModal: () => void;
  isApiConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onOpenAddModal,
  isApiConnected,
}) => {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid var(--border-subtle)',
      padding: '16px 24px',
    }}>
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
          }}>
            <Film size={24} color="#000" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(to right, #ffffff, #fef08a, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                CineVault
              </h1>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                backgroundColor: isApiConnected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: isApiConnected ? '#34d399' : '#f87171',
                border: `1px solid ${isApiConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: isApiConnected ? '#10b981' : '#ef4444',
                }} />
                {isApiConnected ? 'API Online' : 'API Offline'}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Catálogo e Gerenciador de Filmes
            </p>
          </div>
        </div>

        {/* Center Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1 1 320px',
          maxWidth: 480,
        }}>
          <Search size={18} color="var(--text-muted)" style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
          <input
            type="text"
            className="input-field"
            placeholder="Buscar por título, diretor ou ator..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              paddingLeft: 42,
              paddingRight: searchTerm ? 36 : 14,
            }}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Button */}
        <button
          className="btn btn-primary"
          onClick={onOpenAddModal}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Plus size={18} strokeWidth={2.5} />
          Adicionar Filme
        </button>
      </div>
    </header>
  );
};
