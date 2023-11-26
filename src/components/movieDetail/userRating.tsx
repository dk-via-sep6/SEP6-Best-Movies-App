import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface MovieRatingProps {
  rating: number; // assuming the rating is out of 10
}

const UserRating: React.FC<MovieRatingProps> = ({ rating }) => {
  const [open, setOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(rating / 2); // User's rating

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setUserRating(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      Your Rating: {userRating}
      <Button
        sx={{
          marginLeft: 2,
        }}
        variant="outlined"
        onClick={handleOpen}
      >
        Rate
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate this Movie</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Rating
              max={10}
              name="user-rating"
              value={userRating}
              precision={0.5} // Allow half-star increments
              onChange={handleRatingChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserRating;
