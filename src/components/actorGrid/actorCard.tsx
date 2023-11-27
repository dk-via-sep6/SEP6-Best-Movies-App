// MovieCard.tsx
import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style.css";
interface ActorCardProps {
  imageUrl: string;
  name: string;
  age: number;
  nationality: string;
  // ...other properties like rating, year, etc.
}

const MovieCard: React.FC<ActorCardProps> = ({
  imageUrl,
  name,
  age,
  nationality,
}) => {
  return (
    <Card>
      <div className="actorContent">
        <div className="moviePosterContainer">
          <img className="actorPoster" src={imageUrl} alt={name} />
        </div>
        <CardContent>
          <div className="actorText">
            <Typography
              align="center"
              gutterBottom
              variant="h6"
              component="div"
            >
              {name + ", " + age}
            </Typography>

            <Typography>{nationality}</Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;
