// PersonCard.tsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./style.css";
import { PeopleResult } from "../../../model/peopleList";

const PersonCard: React.FC<PeopleResult> = ({
  id,
  name,
  profile_Path,
  popularity,
  topKnownForTitles,
}) => {
  return (
    <Card>
      <div className="personContent">
        <div className="moviePosterContainer">
          <img
            className="personPoster"
            src={"https://image.tmdb.org/t/p/w500" + profile_Path}
            alt={name}
          />
        </div>
        <CardContent>
          <div className="personText">
            <Typography
              align="center"
              gutterBottom
              variant="h6"
              component="div"
            >
              {name}
            </Typography>

            <Typography>{topKnownForTitles}</Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PersonCard;
