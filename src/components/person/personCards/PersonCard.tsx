import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";
import { PeopleResult } from "../../../model/peopleList";

const PersonCard: React.FC<PeopleResult> = ({
  id,
  name,
  profile_Path,
  popularity,
  topKnownForTitles,
}) => {
  const titles = topKnownForTitles.split(", ");

  const renderText = () => {
    if (titles.length > 3) {
      const displayedTitles = titles.slice(0, 3).join(", ");
      return (
        <Tooltip title={topKnownForTitles}>
          <Typography
            sx={{ alignContent: "center", textAlign: "center" }}
            className="multiline-ellipsis"
            lineHeight={"1.5rem"}
          >
            {displayedTitles}
          </Typography>
        </Tooltip>
      );
    } else {
      return (
        <Typography
          sx={{ alignContent: "center", textAlign: "center" }}
          lineHeight={"1.5rem"}
        >
          {topKnownForTitles}
        </Typography>
      );
    }
  };

  return (
    <Card className="personCard">
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
            {renderText()}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PersonCard;
