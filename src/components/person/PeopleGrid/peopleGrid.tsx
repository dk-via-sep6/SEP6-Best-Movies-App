import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { PeopleResult } from "../../../model/peopleList";
import PersonCard from "../personCards/PersonCard";
import "./style.css";
interface PeopleGridProps {
  peopleResult: PeopleResult[];
}

const PeopleGrid: React.FC<PeopleGridProps> = ({ peopleResult }) => {
  const navigate = useNavigate();
  const handlePersonClick = (Id: number) => {
    navigate(`/person/${Id}`);
  };

  return (
    <Grid container spacing={2} className="peopleGridContainer">
      {peopleResult.map((person) => {
        return (
          <Grid item key={person.id}>
            <div onClick={() => handlePersonClick(person.id)}>
              <PersonCard
                id={person.id}
                name={person.name}
                profile_Path={person.profile_Path}
                popularity={person.popularity}
                topKnownForTitles={person.topKnownForTitles}
              />
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PeopleGrid;
