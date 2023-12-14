// MovieCard.tsx
import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./styles.css";
import MovieRating from "../movieDetail/movieRating";
interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  year: number | string;
  voteCount: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  rating,
  year,
  voteCount,
}) => {
  return (
    <Card>
      <div className="cardContent">
        <div className="moviePosterContainer">
          <img
            className="moviePoster"
            height="140"
            src={"https://image.tmdb.org/t/p/w500" + imageUrl}
            alt={title}
          />
        </div>
        <CardContent>
          <div className="cardContent">
            <div className="movieTitle">
              <Typography
                align="center"
                gutterBottom
                variant="h6"
                component="div"
              >
                {title + ", " + year}
              </Typography>
            </div>
            <div className="rating">
              <Typography variant="body2">
                Rating: {rating} ({voteCount} votes)
              </Typography>
              <MovieRating rating={rating} />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;
