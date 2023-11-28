import React, { useState } from "react";
import { Card, TextField, Button, Container } from "@mui/material";
import "./style.css";
import { placeholderMovies } from "../movies/placeholderMovies";
import MovieWatchlist from "../../components/movieWatchlist/movieWatchlist";

const AccountPage: React.FC = () => {
  const [showAccountCard, setShowAccountCard] = useState(false);

  const handleUpdateClick = () => {
    setShowAccountCard(true);
  };

  const handleCancelClick = () => {
    setShowAccountCard(false);
  };

  return (
    <Container className="accountContainer">
      <MovieWatchlist listName="Watchlist" movies={placeholderMovies} />
      <MovieWatchlist listName="Halloween movies" movies={placeholderMovies} />
      <MovieWatchlist listName="Christmas Movies" movies={placeholderMovies} />

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
        <Card className="accountCard">
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
            className="loginButton"
            variant="contained"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <Button
            className="loginButton"
            variant="contained"
            onClick={() => {
              alert("Account deleted");
            }}
          >
            Delete Account
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default AccountPage;
