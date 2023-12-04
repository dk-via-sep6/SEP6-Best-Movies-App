import React, { useState } from "react";
import { TextField, Button, Container, IconButton } from "@mui/material";
import "./style.css";
import { placeholderMovies } from "../movies/placeholderMovies";
import MovieWatchlist from "../../components/movieWatchlist/movieWatchlist";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { deleteUser as deleteUserThunk } from "../../thunks/userThunks";
const AccountPage: React.FC = () => {
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const { updateUserPassword, updateUserEmail } = useAuth();
  const { currentUser, deleteUser, reAuthenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showReAuthDialog, setShowReAuthDialog] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = () => {
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleProfileUpdate = async () => {
    if (validate()) {
      try {
        await updateUserEmail(email);
        alert(
          "A verification email has been sent to your new email address. Please verify to complete the update."
        );
        await updateUserPassword(password);
        alert("Account updated successfully");
        // Reset state or additional logic
      } catch (error: any) {
        if (error.code === "auth/requires-recent-login") {
          setShowReAuthDialog(true); // Show re-authentication dialog
        } else {
          console.error("Error updating account: ", error);
          alert("Error updating account");
        }
      }
    }
  };
  const handleUpdateClick = () => {
    setShowAccountDialog(true);
  };

  const handleCancelClick = () => {
    setShowAccountDialog(false);
  };
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleDeleteDialogOpen = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!currentUser?.uid) {
        throw new Error("User ID is not available");
      }

      await dispatch(deleteUserThunk(currentUser.uid));
      alert("Account deleted");
      handleDeleteDialogClose();
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error deleting account: ", error);
      // Handle error (show error message)
    }
  };

  const handleReAuthenticate = async () => {
    try {
      // Assuming you have a reAuthenticate method in your authContext
      await reAuthenticate(email, password);
      setShowReAuthDialog(false);
      // Retry the sensitive operation here, like updating email or password
    } catch (error) {
      console.error("Re-authentication failed: ", error);
      // Handle re-authentication errors
    }
  };

  return (
    <Container className="accountContainer">
      <Dialog
        open={showReAuthDialog}
        onClose={() => setShowReAuthDialog(false)}
      >
        <DialogTitle>Re-authenticate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your credentials to update your account settings.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReAuthDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReAuthenticate} color="primary">
            Re-authenticate
          </Button>
        </DialogActions>
      </Dialog>

      <h2>Hello, {currentUser ? currentUser.email : "Guest"}!</h2>
      {/* Display the user's email */}
      <div className="movieLists">
        <MovieWatchlist listName="Watchlist" movies={placeholderMovies} />
        <MovieWatchlist
          listName="Halloween movies"
          movies={placeholderMovies}
        />
        <MovieWatchlist
          listName="Christmas Movies"
          movies={placeholderMovies}
        />
      </div>
      {showDeleteDialog && (
        <Dialog
          open={showDeleteDialog}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Button variant="contained" onClick={handleUpdateClick}>
        Update Account
      </Button>

      <Dialog
        open={showAccountDialog}
        onClose={handleCancelClick}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle align="right">
          <IconButton className="closeButton" onClick={handleCancelClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField label="name" fullWidth margin="dense" />
          <TextField
            type="email"
            label="email"
            fullWidth
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="password"
            fullWidth
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="repeat password"
            fullWidth
            margin="dense"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleProfileUpdate}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
          <Button
            onClick={handleDeleteDialogOpen}
            color="warning"
            variant="outlined"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AccountPage;
