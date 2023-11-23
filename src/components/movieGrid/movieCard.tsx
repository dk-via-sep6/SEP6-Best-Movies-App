// MovieCard.tsx
import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  // ...other properties like rating, year, etc.
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          {/* Additional movie information can go here */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
