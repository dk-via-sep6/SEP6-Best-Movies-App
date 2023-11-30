import React, { useState } from "react";
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

interface AddMovieToWatchlistProps {
  movieId: number; // Assuming you pass the movie ID as a prop
}

const AddMovieToWatchlist: React.FC<AddMovieToWatchlistProps> = ({
  movieId,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [guestUserDialog, setGuestUserDialog] = useState(false);
  const [watchlists, setWatchlists] = useState<string[]>([
    "Watchlist 1",
    "Watchlist 2",
  ]); // Example watchlists
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const { isAnonymous } = useAuth();

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

  const handleAddToWatchlist = (watchlistName: string) => {
    console.log(`Add movie ${movieId} to watchlist: ${watchlistName}`);
    // Implement add to watchlist logic here
    handleDialogClose();
  };

  const handleCreateNewWatchlist = () => {
    if (newWatchlistName.trim()) {
      setWatchlists([...watchlists, newWatchlistName]);
      setNewWatchlistName("");
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
                <ListItemText primary={watchlist} />
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
