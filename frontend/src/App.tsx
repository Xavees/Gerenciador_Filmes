import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { StatsHeader } from './components/StatsHeader';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import type { Movie, MovieFormData } from './types/movie';
import { fetchMovies, createMovie, updateMovie, deleteMovie } from './services/api';
import { Film, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load Movies and verify API health
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check test endpoint
      const healthCheck = await fetch('/api/test').then((r) => r.ok).catch(() => false);
      setIsApiConnected(healthCheck);

      const data = await fetchMovies();
      setMovies(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Falha ao conectar com o backend.');
      setIsApiConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter and Sort movies
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        // Search
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          !search ||
          movie.title.toLowerCase().includes(search) ||
          movie.director.toLowerCase().includes(search) ||
          (movie.stars && movie.stars.some((s) => s.toLowerCase().includes(search)));

        // Rating filter
        let matchesRating = true;
        if (selectedFilter === 'top_rated') {
          matchesRating = movie.rating >= 8.0;
        } else if (selectedFilter === 'mid_rated') {
          matchesRating = movie.rating >= 5.0 && movie.rating < 8.0;
        }

        return matchesSearch && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'rating_desc') return b.rating - a.rating;
        if (sortBy === 'rating_asc') return a.rating - b.rating;
        if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
        // default: newest
        return (new Date(b.createdAt || 0).getTime() || 0) - (new Date(a.createdAt || 0).getTime() || 0);
      });
  }, [movies, searchTerm, selectedFilter, sortBy]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleSaveMovie = async (data: MovieFormData) => {
    if (editingMovie) {
      const updated = await updateMovie(editingMovie._id, data);
      setMovies((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
      addToast('success', `"${updated.title}" atualizado com sucesso!`);
    } else {
      const created = await createMovie(data);
      setMovies((prev) => [created, ...prev]);
      addToast('success', `"${created.title}" cadastrado com sucesso!`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMovie) return;
    try {
      setIsDeleting(true);
      await deleteMovie(deletingMovie._id);
      setMovies((prev) => prev.filter((m) => m._id !== deletingMovie._id));
      addToast('success', `Filme "${deletingMovie.title}" removido.`);
      setDeletingMovie(null);
    } catch (err: any) {
      addToast('error', err.message || 'Erro ao remover filme.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenAddModal={handleOpenAddModal}
        isApiConnected={isApiConnected}
      />

      {/* Main Container */}
      <main style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '36px 24px 64px',
        width: '100%',
        flex: 1,
      }}>
        {/* Error Banner */}
        {error && (
          <div className="glass-panel" style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
            <button
              onClick={loadData}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            >
              <RefreshCw size={14} /> Tentar novamente
            </button>
          </div>
        )}

        {/* Catalog Statistics & Filter Toolbar */}
        <StatsHeader
          movies={movies}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Content Section */}
        {isLoading ? (
          <div style={{
            padding: '80px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}>
            <RefreshCw size={36} color="var(--accent-gold)" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Carregando catálogo de filmes...</p>
          </div>
        ) : filteredMovies.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: 24,
          }}>
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onEdit={handleOpenEditModal}
                onDelete={(m) => setDeletingMovie(m)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="glass-panel" style={{
            padding: '64px 24px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            maxWidth: 520,
            margin: '40px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Film size={32} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>
                {searchTerm || selectedFilter !== 'all'
                  ? 'Nenhum filme encontrado'
                  : 'Nenhum filme cadastrado'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {searchTerm || selectedFilter !== 'all'
                  ? 'Tente ajustar os filtros ou termos da sua busca.'
                  : 'Adicione seu primeiro filme para começar a gerenciar sua coleção!'}
              </p>
            </div>
            {searchTerm || selectedFilter !== 'all' ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
              >
                Limpar filtros de busca
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleOpenAddModal}>
                <Sparkles size={16} /> Adicionar Primeiro Filme
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        marginTop: 'auto',
      }}>
        <p>CineVault &copy; 2026 &bull; Express, TypeScript, MongoDB &amp; Vite React</p>
      </footer>

      {/* Modals & Toasts */}
      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveMovie}
        editingMovie={editingMovie}
      />

      <DeleteConfirmModal
        isOpen={!!deletingMovie}
        movie={deletingMovie}
        onClose={() => setDeletingMovie(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
