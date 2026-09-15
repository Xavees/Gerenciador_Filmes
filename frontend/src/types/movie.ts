export interface Movie {
  _id: string;
  title: string;
  rating: number;
  description: string;
  director: string;
  stars: string[];
  poster: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MovieFormData {
  title: string;
  rating: number;
  description: string;
  director: string;
  stars: string[];
  poster: string;
}
