// MoviesGrid.tsx
import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Director } from "../../model/director";
import DirectorCard from "./directorCard";

// Assuming you have a movie model

interface DirectorGridProps {
  directors: Director[]; // An array of movie objects
}

const DirectorGrid: React.FC<DirectorGridProps> = ({ directors }) => {
  const navigate = useNavigate();
  const handleActorClick = (directorId: number) => {
    navigate(`/director/${directorId}`);
  };
  return (
    <Grid container spacing={2}>
      {directors.map((director) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={director.id}>
          <div onClick={() => handleActorClick(director.id)}>
            <DirectorCard
              imageUrl={director.profilePath}
              name={director.name}
              age={dayjs().diff(dayjs(director.dateOfBirth), "year")}
              nationality={director.nationality}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DirectorGrid;
