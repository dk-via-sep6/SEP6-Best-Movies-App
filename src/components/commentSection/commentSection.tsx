// CommentSection.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
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
import { Comment } from "../../model/comment";
import dayjs from "dayjs";
import "./styles.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // New import for the unliked icon
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const initialComments: Comment[] = [
  {
    id: "1",
    author: "User 1",
    text: "Great movie, had a lot of fun watching it!",
    timestamp: dayjs("2021-10-01T12:00:00Z"),
    likes: 0,
    isLiked: false,
  },
  {
    id: "2",
    author: "User 2",
    text: "Interesting plot, but the pacing was a bit slow for my taste.",
    timestamp: dayjs("2021-10-01T12:00:00Z"),
    likes: 0,
    isLiked: true,
  },
  // ...more comments
];

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      text: newComment.trim(),
      timestamp: dayjs(),
      likes: 0,
      isLiked: false,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };
  return (
    <Box className="commentSection">
      {/* Form for new comment */}
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
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <IconButton
                    onClick={() => handleLike(comment.id)}
                    size="small"
                  >
                    {comment.isLiked ? (
                      <FavoriteIcon color="primary" />
                    ) : (
                      <FavoriteBorderIcon color="info" />
                    )}
                  </IconButton>
                }
              >
                <Avatar>{comment.author.charAt(0).toUpperCase()}</Avatar>
                <div className="listItemText">
                  <ListItemText
                    primary={
                      <>
                        {comment.author} -{" "}
                        <Typography component="span" color="textSecondary">
                          {dayjs(comment.timestamp).fromNow()}
                        </Typography>
                      </>
                    }
                    secondary={
                      <>
                        <Typography component="span" color="textSecondary">
                          {comment.likes} likes
                        </Typography>
                        {" - "}
                        <Typography component="span">
                          {" "}
                          {comment.text}
                        </Typography>
                      </>
                    }
                  />
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </div>
    </Box>
  );
};

export default CommentSection;
