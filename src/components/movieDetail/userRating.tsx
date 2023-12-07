import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../context/authContext";
import FeatureRestrictedDialog from "../featureRestrictedDialog/featureRestrictedDialog";
import {
  fetchUserRatingForMovie,
  postRating,
  updateRating,
} from "../../thunks/ratingThunks";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";

interface MovieRatingProps {
  movieId: number;
}

const UserRating: React.FC<MovieRatingProps> = ({ movieId }) => {
  const [open, setOpen] = useState(false);
  const [localUserRating, setLocalUserRating] = useState<number | null>(null); // Added local state for user rating
  const { isAnonymous, currentUser } = useAuth();
  const [guestUserDialog, setGuestUserDialog] = useState(false);
  const dispatch = useAppDispatch();
  const userRating = useSelector((state: any) => state.ratings.userRating);

  useEffect(() => {
    if (currentUser?.uid && movieId) {
      dispatch(fetchUserRatingForMovie(currentUser.uid, movieId));
    }
  }, [dispatch, currentUser, movieId]);

  useEffect(() => {
    // Reset the rating if the movie ID does not match
    if (userRating && userRating.movieId !== movieId) {
      setLocalUserRating(null);
    } else if (userRating && userRating.movieId === movieId) {
      setLocalUserRating(userRating.rating);
    }
  }, [userRating, movieId]);

  const handleOpen = () => {
    if (!isAnonymous) {
      setOpen(true);
    } else {
      setGuestUserDialog(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setLocalUserRating(newValue);
  };

  const handleSubmitRating = () => {
    if (localUserRating !== null && currentUser?.uid) {
      const ratingData = {
        id: userRating?.id || 0,
        movieId: movieId,
        userId: currentUser.uid,
        rating: localUserRating,
      };

      if (userRating && userRating.id) {
        dispatch(updateRating(userRating.id, ratingData));
      } else {
        dispatch(postRating(ratingData));
      }
    }
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <FeatureRestrictedDialog
        open={guestUserDialog}
        onClose={() => setGuestUserDialog(false)}
      />
      Your Rating: {localUserRating ?? "Not rated"}
      <Button sx={{ marginLeft: 2 }} variant="outlined" onClick={handleOpen}>
        Rate
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate this Movie</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Rating
              max={10}
              name="user-rating"
              value={localUserRating ?? 0}
              precision={0.5}
              onChange={handleRatingChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitRating}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserRating;
