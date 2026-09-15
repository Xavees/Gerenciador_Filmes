import React, { useState, useEffect } from 'react';
import { X, Star, Film, Sparkles, Image as ImageIcon } from 'lucide-react';
import type { Movie, MovieFormData } from '../types/movie';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MovieFormData) => Promise<void>;
  editingMovie?: Movie | null;
}

const SAMPLE_MOVIES = [
  {
    title: 'Interstellar',
    rating: 9.5,
    director: 'Christopher Nolan',
    stars: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    description: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade.',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Blade Runner 2049',
    rating: 8.8,
    director: 'Denis Villeneuve',
    stars: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    description: 'Um jovem blade runner descobre um segredo há muito enterrado que o leva a rastrear o ex-blade runner Rick Deckard.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'O Poderoso Chefão',
    rating: 9.8,
    director: 'Francis Ford Coppola',
    stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    description: 'O patriarca envelhecido de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
  },
];

export const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingMovie,
}) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState<number>(8.0);
  const [director, setDirector] = useState('');
  const [starsInput, setStarsInput] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title || '');
      setRating(Number(editingMovie.rating) || 8.0);
      setDirector(editingMovie.director || '');
      setStarsInput(editingMovie.stars ? editingMovie.stars.join(', ') : '');
      setDescription(editingMovie.description || '');
      setPoster(editingMovie.poster || '');
    } else {
      setTitle('');
      setRating(8.0);
      setDirector('');
      setStarsInput('');
      setDescription('');
      setPoster('');
    }
    setValidationError(null);
  }, [editingMovie, isOpen]);

  if (!isOpen) return null;

  const handleApplySample = (sample: typeof SAMPLE_MOVIES[0]) => {
    setTitle(sample.title);
    setRating(sample.rating);
    setDirector(sample.director);
    setStarsInput(sample.stars.join(', '));
    setDescription(sample.description);
    setPoster(sample.poster);
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Client-side validation
    if (!title.trim() || title.trim().length < 2) {
      setValidationError('O título é obrigatório e deve ter no mínimo 2 caracteres.');
      return;
    }
    if (rating < 0 || rating > 10) {
      setValidationError('A nota precisa ser um número entre 0 e 10.');
      return;
    }
    if (!director.trim()) {
      setValidationError('O nome do diretor é obrigatório.');
      return;
    }
    if (!description.trim()) {
      setValidationError('A descrição/sinopse é obrigatória.');
      return;
    }
    if (!poster.trim()) {
      setValidationError('A URL do pôster é obrigatória.');
      return;
    }

    try {
      new URL(poster.trim());
    } catch {
      setValidationError('A imagem precisa ser uma URL válida (ex: https://exemplo.com/poster.jpg).');
      return;
    }

    const starsArray = starsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const formData: MovieFormData = {
      title: title.trim(),
      rating: Number(rating),
      director: director.trim(),
      stars: starsArray,
      description: description.trim(),
      poster: poster.trim(),
    };

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setValidationError(err.message || 'Erro ao salvar o filme.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      overflowY: 'auto',
    }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: 680,
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(16, 21, 34, 0.95)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.15)',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Film size={20} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              {editingMovie ? 'Editar Filme' : 'Cadastrar Novo Filme'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          {/* Quick Sample suggestions (when creating) */}
          {!editingMovie && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={14} /> Preenchimento rápido de teste:
              </span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {SAMPLE_MOVIES.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySample(s)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'var(--text-primary)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Validation Error Message Alert */}
          {validationError && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              fontSize: '0.88rem',
            }}>
              {validationError}
            </div>
          )}

          {/* Title & Rating in grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Título do Filme *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: Interestelar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Nota (0 - 10) *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="input-field"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                  required
                  style={{ paddingRight: 32 }}
                />
                <Star size={15} fill="#f59e0b" color="#f59e0b" style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }} />
              </div>
            </div>
          </div>

          {/* Director & Stars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Diretor *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: Christopher Nolan"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Elenco Principal (separado por vírgulas)
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Ex: Ator 1, Ator 2, Ator 3"
                value={starsInput}
                onChange={(e) => setStarsInput(e.target.value)}
              />
            </div>
          </div>

          {/* Poster URL with Preview */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              URL do Pôster / Imagem * (precisa ser uma URL válida)
            </label>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <input
                type="url"
                className="input-field"
                placeholder="https://exemplo.com/poster.jpg"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              {/* Thumbnail Live Preview */}
              <div style={{
                width: 58,
                height: 74,
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {poster ? (
                  <img
                    src={poster}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <ImageIcon size={20} color="var(--text-muted)" />
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Sinopse / Descrição *
            </label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Descreva a história do filme..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Form Actions Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
            marginTop: 10,
            paddingTop: 16,
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : editingMovie ? 'Atualizar Filme' : 'Salvar Filme'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
