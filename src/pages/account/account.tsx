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
  const [showAccountCard, setShowAccountCard] = useState(false);
  const { currentUser } = useAuth();
  const handleUpdateClick = () => {
    setShowAccountCard(true);
  };

  const handleCancelClick = () => {
    setShowAccountCard(false);
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
      {!showAccountCard && (
        <Button
          className="updateButton"
          variant="contained"
          onClick={handleUpdateClick}
        >
          Update Account
        </Button>
      )}
      {showAccountCard && (
        <div className="updateAccountContainer">
          <Card className="accountCard">
            <div className="closeIcon">
              <IconButton className="loginButton">
                <CloseIcon fontSize="large" onClick={handleCancelClick} />
              </IconButton>
            </div>
            <TextField className="textField" label="name" />
            <TextField type="email" className="textField" label="email" />
            <TextField type="password" className="textField" label="password" />
            <TextField
              type="password"
              className="textField"
              label="repeat password"
            />
            <Button
              className="loginButton"
              variant="contained"
              onClick={() => {
                alert("Account updated");
              }}
            >
              Update
            </Button>
            <Button
              sx={{
                color: "red",
                borderColor: "red",
              }}
              className="loginButton"
              variant="outlined"
              onClick={handleDeleteDialogOpen}
            >
              Delete Account
            </Button>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default AccountPage;
