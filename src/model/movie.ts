import { Genre } from "./genre";

export interface Movie {
  id: number;
  title: string;
  posterPath: string; 
  backdropPath?: string; 
  overview: string; 
  releaseDate: string; 
  genres: Genre[];
  voteAverage: number; 
  voteCount: number; 
  originalLanguage: string;

}
