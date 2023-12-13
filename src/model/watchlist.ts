import { Movie } from "./movie";

export interface Watchlist {
  id: number;
  name: string;
  movies: Movie[];
  userId: string;
}


