// directorCast.tsx
import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { CrewMember } from "../../model/crewMember"; // import CrewMember
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface DirectorCastProps {
  directors: CrewMember[];
}

const DirectorCast: React.FC<DirectorCastProps> = ({ directors }) => {
  const navigate = useNavigate();

  const navigateToDirectorPage = (personId: number) => {
    navigate(`/person/${personId}`);
  };
  return (
    <div className="directorsCastContainer">
      <Typography variant="h5">Directors</Typography>
      <div className="directorsCastContainer">
        <Grid container spacing={2}>
          {directors.map((director) => (
            <Grid item key={director.personId}>
              <div
                className="directorCard"
                onClick={() => {
                  navigateToDirectorPage(director.personId);
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={director.profilePath ? "https://image.tmdb.org/t/p/w500"+director.profilePath:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/120px-User-avatar.svg.png?20201213175635"}
                    alt={director.name}
                  />
                  <div className="directorCardContent">
                    <CardContent>
                      <Typography gutterBottom variant="body1" component="div">
                        {director.name}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default DirectorCast;
