import React, { useEffect, useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../context/authContext";
import FeatureRestrictedDialog from "../featureRestrictedDialog/featureRestrictedDialog";
import {
  fetchWatchlistsByUserId,
  addWatchlist,
  updateWatchlist,
} from "../../thunks/watchlistThunks";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Watchlist } from "../../model/watchlist";
import { Movie } from "../../model/movie";

interface AddMovieToWatchlistProps {
  movie: Movie;
}

const AddMovieToWatchlist: React.FC<AddMovieToWatchlistProps> = ({ movie }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [guestUserDialog, setGuestUserDialog] = useState(false);

  const [newWatchlistName, setNewWatchlistName] = useState("");
  const { isAnonymous } = useAuth();
  const dispatch = useAppDispatch();
  const watchlists = useSelector(
    (state: RootState) => state.watchlists.watchlists
  );
  const currentUser = useAuth();

  const handleDialogOpen = () => {
    if (!isAnonymous) {
      setDialogOpen(true);
    } else {
      handleGuestUserDialogOpen();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleGuestUserDialogOpen = () => {
    setGuestUserDialog(true);
  };
  const handleGuestUserDialogClose = () => {
    setGuestUserDialog(false);
  };
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWatchlistsByUserId(currentUser.currentUser?.uid ?? ""));
    }
  }, [dispatch, currentUser]);

  const handleAddToWatchlist = (watchlist: Watchlist) => {
    const isMovieInWatchlist = watchlist.movies.some((m) => m.id === movie.id);

    if (!isMovieInWatchlist) {
      const updatedWatchlist = {
        ...watchlist,
        movies: [...watchlist.movies, movie],
      };
      dispatch(updateWatchlist(updatedWatchlist));
      handleDialogClose();
    }
    else 
    {
      alert("Already in List!!")
    }
  };

  const handleCreateNewWatchlist = () => {
    if (newWatchlistName.trim()) {
      const newWatchlist: Watchlist = {
        id: 0, 
        name: newWatchlistName,
        movies: [movie], 
        userId: currentUser.currentUser?.uid ?? "",
      };
      dispatch(addWatchlist(newWatchlist));
      setNewWatchlistName("");
      handleDialogClose();
    }
  };

  return (
    <>
      <FeatureRestrictedDialog
        open={guestUserDialog}
        onClose={handleGuestUserDialogClose}
      />
      <IconButton onClick={handleDialogOpen}>
        <Tooltip
          title="Add to watchlist"
          children={<AddIcon fontSize="large" />}
        ></Tooltip>
      </IconButton>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Movie to Watchlist</DialogTitle>
        <DialogContent>
          <List>
            {watchlists.map((watchlist, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleAddToWatchlist(watchlist)}
              >
                <ListItemText primary={watchlist.name} />
              </ListItem>
            ))}
          </List>
          <TextField
            label="New Watchlist"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNewWatchlist}>
            Create New Watchlist
          </Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMovieToWatchlist;
