import { Movie } from "./movie";

export interface Actor {
    id: number;
    name: string;
    profilePath: string; // URL to the actor's profile image
    nationality: string;
    dateOfBirth: string; // Can be a Date object or a string
    description: string;
    movies: Movie[]; 
  }
  