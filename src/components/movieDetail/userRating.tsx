import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../context/authContext";
import FeatureRestrictedDialog from "../featureRestrictedDialog/featureRestrictedDialog";

interface MovieRatingProps {
  rating: number | null; // assuming the rating is out of 10
}

const UserRating: React.FC<MovieRatingProps> = ({ rating }) => {
  const [open, setOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null); // User's rating
  const { isAnonymous } = useAuth();
  const [guestUserDialog, setGuestUserDialog] = useState(false);

  const handleOpen = () => {
    if (!isAnonymous) {
      setOpen(true);
    } else {
      handleGuestUserDialogOpen();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGuestUserDialogOpen = () => {
    setGuestUserDialog(true);
  };
  const handleGuestUserDialogClose = () => {
    setGuestUserDialog(false);
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
      <FeatureRestrictedDialog
        open={guestUserDialog}
        onClose={handleGuestUserDialogClose}
      />
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
