export interface Comment {
  // could be a number if your backend uses numerical IDs
  id: number;
  authorId: string;
  movieId: number;
  content: string;
  timestamp?: null | string;
  likedBy: string[]; // New property for likes
  authorUsername?: string;
}
