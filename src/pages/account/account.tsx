import React, { useState } from "react";
import { Card, TextField, Button, Container, IconButton } from "@mui/material";
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

const AccountPage: React.FC = () => {
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const { currentUser } = useAuth();
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

  const handleConfirmDelete = () => {
    // Handle the account deletion logic here
    alert("Account deleted");
    handleDeleteDialogClose();
  };

  return (
    <Container className="accountContainer">
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
          <TextField type="email" label="email" fullWidth margin="dense" />
          <TextField
            type="password"
            label="password"
            fullWidth
            margin="dense"
          />
          <TextField
            type="password"
            label="repeat password"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => alert("Account updated")}
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
