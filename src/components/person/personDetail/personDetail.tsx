import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchPerson, fetchPersonCredits } from "../../../thunks/personThunks";
import dayjs from "dayjs";
import PersonCastCreditsList from "../personCreditsList/personCastCreditsList";
import PersonCrewCreditsList from "../personCreditsList/personCrewCreditsList";

const PersonDetails: React.FC = () => {
  let { personId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const person = useSelector((state: RootState) => state.person.currentPerson);
  const personLoading = useSelector((state: RootState) => state.person.loading);
  const personError = useSelector((state: RootState) => state.person.error);

  useEffect(() => {
    if (personId) {
      dispatch(fetchPerson(personId));
      dispatch(fetchPersonCredits(personId));
    }
  }, [personId, dispatch]);

  // Handle loading and error states
  if (personLoading) {
    return <div>Loading...</div>;
  }

  if (personError) {
    return <div>Error: {personError}</div>;
  }

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="PersonDetailsContainer">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img
            className="PersonImage"
            src={"https://image.tmdb.org/t/p/w500" + person.profilePath}
            alt={person.name}
          />
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginTop: "30px" }}>
          <Typography gutterBottom variant="h4" component="div">
            {person.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            From: {person.placeOfBirth}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Date of Birth: {dayjs(person.birthday).format("DD MMM YYYY")}
          </Typography>
          <Typography variant="body2">{person.biography}</Typography>
        </Grid>
      </Grid>
      <Typography gutterBottom variant="h4">
        Movies
      </Typography>
      <PersonCastCreditsList />
      <Typography gutterBottom variant="h6">
        Crew
      </Typography>
      <PersonCrewCreditsList />
    </div>
  );
};

export default PersonDetails;
