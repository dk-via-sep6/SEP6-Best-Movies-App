import { Genre } from "./genre";

export enum MediaType {
  Unknown,
  Movie,
  TV,
}

export interface PersonInfoRole {
  id: number;
  mediaType: MediaType;
  tvShowName: string;
  tvShowOriginalName: string;
  movieTitle: string;
  movieOriginalTitle: string;
  backdropPath: string;
  posterPath: string;
  movieReleaseDate: string;
  tvShowFirstAirDate: string;
  overview: string;
  isAdultThemed: string;
  isVideosVideo: string;
  genres: Genre[];
  originalLanguage: string;
  popularity: number;
  voteCount: number;
  voteAverage: number;
  originCountry: string[];
}
