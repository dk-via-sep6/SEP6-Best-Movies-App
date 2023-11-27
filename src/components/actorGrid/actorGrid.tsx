// MoviesGrid.tsx
import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Actor } from "../../model/actor";
import ActorCard from "./actorCard";

// Assuming you have a movie model

interface ActorGridProps {
  actors: Actor[]; // An array of movie objects
}

const ActorGrid: React.FC<ActorGridProps> = ({ actors }) => {
  const navigate = useNavigate();
  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };
  return (
    <Grid container spacing={2}>
      {actors.map((actor) => (
        <Grid item key={actor.id}>
          <div onClick={() => handleActorClick(actor.id)}>
            <ActorCard
              imageUrl={actor.profilePath}
              name={actor.name}
              age={dayjs().diff(dayjs(actor.dateOfBirth), "year")}
              nationality={actor.nationality}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorGrid;
