import { Dayjs } from "dayjs";
import { Movie } from "./movie";

export interface Director {
  id: number;
  name: string;
  profilePath: string;
  description: string;
  nationality: string;
  dateOfBirth: string | Dayjs;
  movies: Movie[];
}
