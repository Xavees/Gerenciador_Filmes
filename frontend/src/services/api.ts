import type { Movie, MovieFormData } from '../types/movie';

const API_BASE = '/api';

export async function fetchMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_BASE}/movie`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Erro ao carregar os filmes');
  }
  return res.json();
}

export async function fetchMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${API_BASE}/movie/${id}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Filme não encontrado');
  }
  return res.json();
}

export async function createMovie(movie: MovieFormData): Promise<Movie> {
  const res = await fetch(`${API_BASE}/movie`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      const messages = data.errors
        .map((err: Record<string, string>) => Object.values(err).join(', '))
        .join('; ');
      throw new Error(messages || 'Erro de validação ao criar o filme');
    }
    throw new Error(data.error || 'Erro ao criar o filme');
  }

  return data;
}

export async function updateMovie(id: string, movie: Partial<MovieFormData>): Promise<Movie> {
  const res = await fetch(`${API_BASE}/movie/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao atualizar o filme');
  }

  return data;
}

export async function deleteMovie(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/movie/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao deletar o filme');
  }

  return data;
}
