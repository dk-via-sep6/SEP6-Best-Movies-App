export interface Comment {
  id: number;
  authorId: string;
  movieId: number;
  content: string;
  timestamp?: null | string;
  likedBy: string[];
  authorUsername?: string;
}
