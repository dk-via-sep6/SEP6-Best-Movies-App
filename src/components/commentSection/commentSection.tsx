// CommentSection.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Comment } from "../../model/comment";
import dayjs from "dayjs";
import "./styles.css";
// Dummy data for existing comments
const initialComments: Comment[] = [
  {
    id: "1",
    author: "User 1",
    text: "Great movie, had a lot of fun watching it!",
    timestamp: dayjs("2021-10-01T12:00:00Z"),
  },
  {
    id: "2",
    author: "User 2",
    text: "Interesting plot, but the pacing was a bit slow for my taste.",
    timestamp: dayjs("2021-10-01T12:00:00Z"),
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

    // Submit the new comment to the backend here, and then update the state
    // For now, we'll just add it to the local state
    const newCommentObj = {
      id: Date.now().toString(), // Generate a unique ID for the key; replace with real ID from backend
      author: "Current User", // Replace with the current user's name or ID
      text: newComment.trim(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment(""); // Reset the input after submission
  };

  return (
    <Box className="commentSection">
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemText primary={comment.author} secondary={comment.text} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <form onSubmit={handleCommentSubmit}>
        <TextField
          fullWidth
          label="Leave a comment"
          variant="outlined"
          multiline
          rows={4}
          value={newComment}
          onChange={handleCommentChange}
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default CommentSection;
