import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

interface MovieRatingProps {
  rating: number; // assuming the rating is out of 10
}

const MovieRating: React.FC<MovieRatingProps> = ({ rating }) => {
  return (
    <Box display="flex" alignItems="center">
      <Rating
        name="read-only"
        value={rating / 2} // Convert the rating to a 5-star scale
        precision={0.1} // Allow half-star increments
        readOnly
      />
    </Box>
  );
};

export default MovieRating;
