import React from "react";
import { Container, Grid, Pagination } from "@mui/material";
import ActorGrid from "../../components/actorGrid/actorGrid";
import { placeholderActors } from "./placeholderActors";

const ActorsPage: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/*     <Carousel /> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Autocomplete
            renderInput={(params) => <TextField {...params} label="Actors" />}
            options={placeholderActors.map((actor) => actor.name)}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <ActorGrid actors={placeholderActors} />
        </Grid>
        <Grid item xs={12}>
          <Pagination count={10} color="primary" />{" "}
          {/* Adjust the count as per your pagination logic */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActorsPage;
