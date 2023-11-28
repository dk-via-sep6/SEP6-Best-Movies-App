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

interface AddMovieToWatchlistProps {
  movieId: number; // Assuming you pass the movie ID as a prop
}

const AddMovieToWatchlist: React.FC<AddMovieToWatchlistProps> = ({
  movieId,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [watchlists, setWatchlists] = useState<string[]>([
    "Watchlist 1",
    "Watchlist 2",
  ]); // Example watchlists
  const [newWatchlistName, setNewWatchlistName] = useState("");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
