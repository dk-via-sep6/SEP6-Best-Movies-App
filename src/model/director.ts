import { Dayjs } from "dayjs";
import { Movie } from "./movie";

export interface Director {
    id: number;
    name: string;
    profilePath: string; // URL to the director's profile image,
    description: string;
    nationality: string;
    dateOfBirth: string|Dayjs; // Can be a Date object or a string
    movies: Movie[];
  }
  