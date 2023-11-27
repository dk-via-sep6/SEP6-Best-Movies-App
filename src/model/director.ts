import { Movie } from "./movie";

export interface Director {
    id: number;
    name: string;
    profilePath: string; // URL to the director's profile image,
    description: string;
    movies: Movie[];
  }
  