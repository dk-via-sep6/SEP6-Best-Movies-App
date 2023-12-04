import React from "react";
import { Container, Grid } from "@mui/material";
import Carousel from "../../components/carousel/carousel";
import DirectorDetail from "../../components/directorDetail/directorDetail";
const DirectorDetailPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
       {/*    <Carousel /> */}
        </Grid>
        <Grid item xs={12}>
          <DirectorDetail />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DirectorDetailPage;
