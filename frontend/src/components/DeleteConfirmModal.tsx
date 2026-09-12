import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import type { Movie } from '../types/movie';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  movie: Movie | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  movie,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !movie) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: 440,
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'rgba(18, 24, 38, 0.98)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(239, 68, 68, 0.15)',
      }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AlertTriangle size={28} />
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
            Excluir filme?
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Tem certeza de que deseja remover <strong style={{ color: 'var(--text-primary)' }}>"{movie.title}"</strong> do catálogo? Esta ação não pode ser desfeita.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
            style={{ flex: 1 }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{ flex: 1 }}
          >
            <Trash2 size={16} />
            {isDeleting ? 'Excluindo...' : 'Sim, Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
};
