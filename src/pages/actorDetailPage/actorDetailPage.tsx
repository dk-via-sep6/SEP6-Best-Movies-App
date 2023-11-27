import React from "react";
import { Container, Grid } from "@mui/material";
import Carousel from "../../components/carousel/carousel";
import ActorDetails from "../../components/actorDetail/actorDetail";

const ActorDetailPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Carousel />
        </Grid>
        <Grid item xs={12}>
          <ActorDetails />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActorDetailPage;