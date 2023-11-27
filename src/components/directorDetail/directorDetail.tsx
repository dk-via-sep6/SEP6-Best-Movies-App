import { Grid, Typography } from "@mui/material";
import MoviesParticipated from "../moviesParticipated/moviesParticipated";
import { Director } from "../../model/director";
import "./styles.css";
const sampleDirector: Director = {
  id: 1,
  name: "Jane Smith",
  profilePath:
    "https://m.media-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_FMjpg_UX1000_.jpg",
  description:
    "An acclaimed director known for her visionary storytelling and innovative techniques.",
  movies: [
    // Array of movies directed by Jane Smith
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
    // ... other movies
  ],
};
const DirectorDetail: React.FC = () => {
  const director = sampleDirector;
  return (
    <div className="directorDetailsContainer">
      {" "}
      {/* Changed the class name */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img
            className="directorImage"
            src={director.profilePath}
            alt={director.name}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography gutterBottom variant="h5" component="div">
            {director.name}
          </Typography>
          {/* Removed nationality and date of birth since they're not in the model */}
          <Typography variant="body2">{director.description}</Typography>
        </Grid>
      </Grid>
      <Typography gutterBottom variant="h6">
        Movies Directed
      </Typography>
      <MoviesParticipated movies={director.movies} />
      {/* You may want to remove this empty Grid or use it as needed */}
    </div>
  );
};
export default DirectorDetail;
