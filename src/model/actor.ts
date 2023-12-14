import { Movie } from "./movie";

export interface Actor {
  id: number;
  name: string;
  profilePath: string;
  nationality: string;
  dateOfBirth: string;
  description: string;
  movies: Movie[];
}
