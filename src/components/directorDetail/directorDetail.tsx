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
  nationality: "American",
  dateOfBirth: "1980-01-01",
  movies: [

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
