import React from "react";
import { Container, Grid } from "@mui/material";
import PersonDetails from "../../components/person/personDetail/personDetail";

const PersonDetailsPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PersonDetails />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonDetailsPage;
