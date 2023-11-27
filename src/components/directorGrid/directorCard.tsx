// MovieCard.tsx
import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style.css";
interface DirectorCardProps {
  imageUrl: string;
  name: string;
  age: number;
  nationality: string;
  // ...other properties like rating, year, etc.
}

const DirectorCard: React.FC<DirectorCardProps> = ({
  imageUrl,
  name,
  age,
  nationality,
}) => {
  return (
    <Card>
      <div className="directorContent">
        <div className="directorPosterContainer">
          <img className="directorPoster" src={imageUrl} alt={name} />
        </div>
        <CardContent>
          <div className="directorText">
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

export default DirectorCard;
