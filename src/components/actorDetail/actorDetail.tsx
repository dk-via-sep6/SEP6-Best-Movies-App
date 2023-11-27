import { Grid, Typography, List, ListItem } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Actor } from "../../model/actor";
import "./style.css";
import ActorMovies from "./actorMovies";
const ActorDetails: React.FC = () => {
  let { actorId } = useParams();
  const actor: Actor = {
    id: 0,
    name: "Daniel Radcliffe",
    profilePath:
      "https://m.media-amazon.com/images/M/MV5BZmE0NzNiNzQtYTVlYS00MjljLWE4MTgtYzYxNjU2NjZkM2M4XkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg",
    nationality: "British",
    dateOfBirth: "23 July 1989",
    description:
      "Daniel Jacob Radcliffe is an English actor and producer. He is best known for playing Harry Potter in the Harry Potter film series during his adolescence and early adulthood.",
    movies: [
      {
        id: 1,
        title: "Interstellar",
        posterPath:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        overview:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2014-11-05",
        genres: ["Adventure", "Drama", "Science Fiction"],
        voteAverage: 8.3,
        voteCount: 23550,
        originalLanguage: "en",
      },
      {
        id: 2,
        title: "Inception",
        posterPath:
          "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        overview:
          "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        releaseDate: "2010-07-16",
        genres: ["Action", "Science Fiction", "Adventure"],
        voteAverage: 8.3,
        voteCount: 30500,
        originalLanguage: "en",
      },
      {
        id: 3,
        title: "The Dark Knight",
        posterPath:
          "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        overview:
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        releaseDate: "2008-07-16",
        genres: ["Drama", "Action", "Crime"],
        voteAverage: 8.4,
        voteCount: 24567,
        originalLanguage: "en",
      },
      {
        id: 4,
        title: "The Matrix",
        posterPath:
          "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        overview:
          "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        releaseDate: "1999-03-31",
        genres: ["Action", "Science Fiction"],
        voteAverage: 8.1,
        voteCount: 20245,
        originalLanguage: "en",
      },
    ],
  };
  // Fetch actor details using actorId or retrieve from state
  // ...

  return (
    <div className="actorDetailsContainer">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img
            className="actorImage"
            src={actor.profilePath}
            alt={actor.name}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography gutterBottom variant="h5" component="div">
            {actor.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Nationality: {actor.nationality}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Date of Birth: {actor.dateOfBirth}
          </Typography>
          <Typography variant="body2">{actor.description}</Typography>
        </Grid>
      </Grid>
      <Typography gutterBottom variant="h6">
        Movies
      </Typography>
      <ActorMovies movies={actor.movies} />
      <Grid container spacing={2}>
        <div></div>
      </Grid>
    </div>
  );
};

export default ActorDetails;
