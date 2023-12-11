import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Pagination } from "@mui/material";
import PeopleGrid from "../../components/person/PeopleGrid/peopleGrid";
import { fetchTrendingPeople } from "../../thunks/personThunks";
import { AppDispatch, RootState } from "../../store";

const PeoplePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const people = useSelector(
    (state: RootState) => state.peopleList.currentPeopleList
  );

  useEffect(() => {
    dispatch(fetchTrendingPeople());
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PeopleGrid peopleResult={people ? people.results : []} />
        </Grid>
        <Grid item xs={12}>
          {people && <Pagination count={people.total_pages} color="primary" />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PeoplePage;
