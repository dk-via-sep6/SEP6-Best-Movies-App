// MovieCard.tsx
import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./styles.css";
interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  year: number | string;
  // ...other properties like rating, year, etc.
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  rating,
  year,
}) => {
  return (
    <Card>
      <CardActionArea className="movieCardArea">
        <CardMedia component="img" height="200" image={imageUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>

          <Typography component="div">Rating: {rating}</Typography>
          <Typography component="div">Release Date:{year}</Typography>
          {/* Additional movie information can go here */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
