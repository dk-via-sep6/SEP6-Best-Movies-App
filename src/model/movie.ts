import { Genre } from "./genre";

export interface Movie {
  id: number;
  title: string;
  posterPath: string; // URL to the movie's poster image
  backdropPath?: string; // URL to the movie's backdrop image (optional)
  overview: string; // A brief summary of the movie
  releaseDate: string; // Could also be a Date object
  genres: Genre[];
  voteAverage: number; // Average rating from 0 to 10
  voteCount: number; // Number of votes the movie has received
  originalLanguage: string;
  // Additional properties as needed
}
