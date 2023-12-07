import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface Comment {
  id?: number; // Assuming each comment has a unique ID
  authorId: string;
  movieId: number;
  content: string;
  timestamp?: Dayjs | null;
  likedBy: string[];
  authorUsername: string;
  // ... define comment structure
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
      state.loading = false;
    },
    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    postCommentSuccess(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    updateCommentSuccess(state, action: PayloadAction<Comment>) {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    deleteCommentSuccess(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        (comment) => comment.id?.toString() !== action.payload
      );
    },
    likeCommentSuccess(
      state,
      action: PayloadAction<{ commentId: number; userId: string }>
    ) {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment && !comment.likedBy.includes(userId)) {
        comment.likedBy.push(userId);
      }
    },
    unlikeCommentSuccess(
      state,
      action: PayloadAction<{ commentId: number; userId: string }>
    ) {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.likedBy = comment.likedBy.filter((id) => id !== userId);
      }
      // ... other reducers as necessary
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  postCommentSuccess,
  updateCommentSuccess,
  deleteCommentSuccess,
  likeCommentSuccess,
  unlikeCommentSuccess,
  // ... other actions
} = commentSlice.actions;

export default commentSlice.reducer;
