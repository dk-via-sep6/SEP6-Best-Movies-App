import { Dayjs } from "dayjs";

export interface Comment {
    id: string; // could be a number if your backend uses numerical IDs
    author: string;
    text: string;
    timestamp?: Dayjs|null;
    // Add other properties like timestamp if needed
  }