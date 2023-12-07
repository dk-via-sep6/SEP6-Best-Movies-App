// CommentSection.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchCommentsByMovieId,
  postComment,
  likeComment,
  unlikeComment,
} from "../../thunks/commentThunks";
import { Comment as CommentModel } from "../../model/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../context/authContext";
import FeatureRestrictedDialog from "../featureRestrictedDialog/featureRestrictedDialog";
import Avatar from "@mui/material/Avatar";
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  Divider,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./styles.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";

dayjs.extend(relativeTime);

const CommentSection: React.FC = () => {
  const [newComment, setNewComment] = useState("");
  const { isAnonymous, currentUser } = useAuth();
  const [guestUserDialog, setGuestUserDialog] = useState(false);
  const dispatch = useAppDispatch();
  const movieId = useSelector(
    (state: RootState) => state.movie.currentMovie?.id
  );

  const loading = useSelector((state: RootState) => state.comments.loading);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchCommentsByMovieId(movieId));
    }
  }, [dispatch, movieId]);

  const comments = useSelector((state: RootState) => state.comments.comments);
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleGuestUserDialogOpen = () => {
    setGuestUserDialog(true);
  };

  const handleGuestUserDialogClose = () => {
    setGuestUserDialog(false);
  };

  const handleCommentSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isAnonymous) {
      handleGuestUserDialogOpen();
    } else {
      if (!newComment.trim()) return;

      const newCommentObj: CommentModel = {
        id: 0,
        authorId: currentUser?.uid ?? "",
        movieId: movieId ?? 0,
        content: newComment.trim(),
        timestamp: dayjs().toString(),
        likedBy: [],
        authorUsername: "",
      };
      // Dispatch the action to post the new comment
      dispatch(postComment(newCommentObj));
      setNewComment("");
    }
  };
  const getAvatarLetter = (author: string) => {
    return author.charAt(0).toUpperCase();
  };

  const handleLike = (commentId: number) => {
    if (isAnonymous) {
      handleGuestUserDialogOpen();
      return;
    }
    const userId = currentUser?.uid ?? "";
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      if (comment.likedBy.includes(userId)) {
        // User already liked the comment, so dispatch unlike action
        dispatch(unlikeComment(commentId, userId));
      } else {
        // User hasn't liked the comment, so dispatch like action
        dispatch(likeComment(commentId, userId));
      }
    }
  };
  return (
    <Box className="commentSection">
      <FeatureRestrictedDialog
        open={guestUserDialog}
        onClose={handleGuestUserDialogClose}
      />
      <form onSubmit={handleCommentSubmit} className="commentInputForm">
        <TextField
          sx={{ width: "100%" }}
          label="Leave a comment"
          variant="outlined"
          multiline
          rows={2}
          value={newComment}
          onChange={handleCommentChange}
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Post
        </Button>
      </form>
      <div className="commentList">
        <List>
          {comments.map((comment) => {
            const isLiked = currentUser
              ? comment.likedBy.includes(currentUser.uid)
              : false;

            return (
              <React.Fragment>
                <ListItem alignItems="flex-start">
                  <Avatar>{getAvatarLetter(comment.authorUsername)}</Avatar>
                  <div className="listItemText">
                    <ListItemText
                      primary={
                        <>
                          {comment.authorUsername} -{" "}
                          <Typography component="span" color="textSecondary">
                            {dayjs(comment.timestamp?.toString()).fromNow()}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography component="span" color="textSecondary">
                            {comment.likedBy.length} likes
                          </Typography>
                          {" - "}
                          <Typography component="span">
                            {comment.content}
                          </Typography>
                        </>
                      }
                    />
                  </div>
                  <IconButton
                    onClick={() => handleLike(comment.id ?? 0)}
                    size="small"
                  >
                    {isLiked ? (
                      <FavoriteIcon color="primary" />
                    ) : (
                      <FavoriteBorderIcon color="info" />
                    )}
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </div>
    </Box>
  );
};

export default CommentSection;
