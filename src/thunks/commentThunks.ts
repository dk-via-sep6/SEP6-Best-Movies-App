import { Dispatch } from "redux";
import {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  postCommentSuccess,
  updateCommentSuccess,
  deleteCommentSuccess,
  likeCommentSuccess,
  unlikeCommentSuccess,
} from "../slices/commentSlice";
import { Comment } from "../model/comment";
import dayjs from "dayjs";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchCommentsByMovieId = (movieId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchCommentsStart());

    try {
      const response = await fetch(`${serverUrl}/Comment/movie/${movieId}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }

      const data = await response.json();
      dispatch(fetchCommentsSuccess(data));
    } catch (error) {
      dispatch(fetchCommentsFailure("Network error. Please try again"));
    }
  };
};
export const postComment = (commentData: Comment) => {
  return async (dispatch: Dispatch) => {
    try {
      const payload = {
        id: 0,
        authorId: commentData.authorId,
        movieId: commentData.movieId,
        timestamp: dayjs().toISOString(),
        content: commentData.content,
        likedBy: [],
        authorUsername: commentData.authorUsername,
      };

      const response = await fetch(`${serverUrl}/Comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      const data = await response.json();
      dispatch(postCommentSuccess(data));
    } catch (error) {}
  };
};

export const updateComment = (
  commentId: number,
  commentData: { text: string }
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${serverUrl}/Comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${apiKey}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment.");
      }

      const data = await response.json();
      dispatch(updateCommentSuccess(data));
    } catch (error) {}
  };
};

export const deleteComment = (commentId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${serverUrl}/Comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment.");
      }

      dispatch(deleteCommentSuccess(commentId));
    } catch (error) {}
  };
};
export const likeComment = (commentId: number, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${serverUrl}/Comment/${commentId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${apiKey}`,
        },
        body: JSON.stringify(userId),
      });

      if (!response.ok) {
        throw new Error("Failed to like comment.");
      }

      dispatch(likeCommentSuccess({ commentId, userId }));
    } catch (error) {}
  };
};

export const unlikeComment = (commentId: number, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${serverUrl}/Comment/${commentId}/unlike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${apiKey}`,
        },
        body: JSON.stringify(userId),
      });

      if (!response.ok) {
        throw new Error("Failed to unlike comment.");
      }

      dispatch(unlikeCommentSuccess({ commentId, userId }));
    } catch (error) {}
  };
};
