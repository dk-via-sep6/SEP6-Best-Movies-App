import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchWatchlistsByUserId } from "../../thunks/watchlistThunks";
import "./style.css";
import AccountField from "../../components/account/accountField";
import { Container } from "@mui/material";
import MovieWatchlist from "../../components/movieWatchlist/movieWatchlist";

const AccountPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchedUser = useSelector((state: RootState) => state.users.data);

  useEffect(() => {
    if (fetchedUser?.id) {
      dispatch(fetchWatchlistsByUserId(fetchedUser.id));
    }
  }, [fetchedUser, dispatch]);

  const watchlists = useSelector(
    (state: RootState) => state.watchlists.watchlists
  );

  return (
    <Container className="accountContainer">
      <h2>Hello, {fetchedUser?.username}!</h2>
      <div className="movieLists">
        {watchlists.map((watchlist, index) => (
          <MovieWatchlist
            id={watchlist.id}
            key={watchlist.id}
            name={watchlist.name}
            movies={watchlist.movies}
            userId={watchlist.userId}
          />
        ))}
      </div>

      <AccountField />
    </Container>
  );
};

export default AccountPage;
