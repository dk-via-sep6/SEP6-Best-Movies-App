import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MovieWatchlist from "../../components/movieWatchlist/movieWatchlist";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import {
  deleteUser as deleteUserThunk,
  fetchUserById,
} from "../../thunks/userThunks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchWatchlistsByUserId,
  fetchWatchlistById,
} from "../../thunks/watchlistThunks";
import { Movie } from "../../model/movie";
import "./style.css";
import { Watchlist } from "../../model/watchlist";

const AccountPage: React.FC = () => {
  // State declarations and other hooks
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showReAuthDialog, setShowReAuthDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aggregatedMovies, setAggregatedMovies] = useState<Movie[]>([]);
  const {
    currentUser,
    deleteUser,
    reAuthenticate,
    updateUserPassword,
    updateUserEmail,
  } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const watchlists = useSelector(
  //   (state: RootState) => state.watchlists.watchlists
  // );
  // const movies = useSelector((state: RootState) => state.movies.currentMovies);

  const fetchedUser = useSelector((state: RootState) => state.users.data);

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchUserById(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (fetchedUser?.id) {
      dispatch(fetchWatchlistsByUserId(fetchedUser.id));
    }
  }, [fetchedUser, dispatch]);
  const watchlists = useSelector(
    (state: RootState) => state.watchlists.watchlists
  );

  const allMovies = useSelector(
    (state: RootState) => state.movies.currentMovies
  );

  useEffect(() => {
    if (allMovies?.length)
      if (watchlists.length > 0 && allMovies?.length > 0) {
        const moviesFromWatchlists = watchlists
          .flatMap((watchlist) =>
            watchlist.movies.map((movieId) =>
              allMovies?.find((movie) => movie.id === movieId)
            )
          )
          .filter((movie) => movie !== undefined) as Movie[];

        setAggregatedMovies(moviesFromWatchlists);
      }
  }, [watchlists, allMovies]);
  console.log(watchlists, " watchlists");
  // Handle profile update validation
  if (!fetchedUser || watchlists.length === 0 || allMovies?.length === 0) {
    // Show a loading indicator or a message until the data is loaded
    return <div>Loading...</div>;
  }
  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
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
      } catch (error: any) {
        if (error.code === "auth/requires-recent-login") {
          setShowReAuthDialog(true);
        } else {
          console.error("Error updating account: ", error);
          alert("Error updating account");
        }
      }
    }
  };

  const handleReAuthenticate = async () => {
    try {
      await reAuthenticate(email, password);
      setShowReAuthDialog(false);
    } catch (error) {
      console.error("Re-authentication failed: ", error);
    }
  };

  const handleMovieRemoval = async (watchlistId: number, movieId: number) => {
    // Step 1: Update the watchlists state locally
    const updatedWatchlists = watchlists.map((watchlist: Watchlist) => {
      if (watchlist.id === watchlistId) {
        return {
          ...watchlist,
          movies: watchlist.movies.filter((id) => id !== movieId),
        };
      }
      return watchlist;
    });
    const moviesFromWatchlists = updatedWatchlists
      .flatMap((watchlist) =>
        watchlist.movies.map((movieId) =>
          allMovies?.find((movie) => movie.id === movieId)
        )
      )
      .filter((movie) => movie !== undefined) as Movie[];
    setAggregatedMovies(moviesFromWatchlists);
  };
  const handleDeleteDialogOpen = () => setShowDeleteDialog(true);
  const handleDeleteDialogClose = () => setShowDeleteDialog(false);

  const handleConfirmDelete = async () => {
    try {
      if (!currentUser?.uid) {
        throw new Error("User ID is not available");
      }
      deleteUser();
      await dispatch(deleteUserThunk(currentUser.uid));
      alert("Account deleted");
      handleDeleteDialogClose();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
    // Your existing logic for confirming account deletion
  };

  const handleUpdateClick = () => setShowAccountDialog(true);
  const handleCancelClick = () => setShowAccountDialog(false);

  return (
    <Container className="accountContainer">
      <h2>Hello, {fetchedUser?.username}!</h2>
      <div className="movieLists">
        {watchlists.map((watchlist, index) => (
          <MovieWatchlist
            key={index}
            watchlistId={watchlist.id}
            listName={watchlist.name}
            movies={
              watchlist.movies
                .map((movieId) =>
                  aggregatedMovies?.find((movie) => movie.id === movieId)
                )
                .filter((movie) => movie !== undefined) as Movie[]
            }
            onMovieRemove={handleMovieRemoval}
          />
        ))}
      </div>

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
          <TextField label="name" fullWidth margin="dense" value={username} />
          <TextField
            value={currentUser?.email || ""}
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

      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
};

export default AccountPage;
