// actorCast.tsx
import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Tooltip } from "@mui/material";
import { CastMember } from "../../model/castMember"; // import CastMember
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface ActorCastProps {
  actors: CastMember[];
}

const ActorCast: React.FC<ActorCastProps> = ({ actors }) => {
  const navigate = useNavigate();

  const handleActorClick = (personId: number) => {
    navigate(`/actor/${personId}`);
  };

  return (
    <div>
      <Typography variant="h5">Cast</Typography>
      <div className="actorCastContainer">
        <Grid container spacing={2}>
          {actors.map((actor) => (
            <Grid item key={actor.personId}>
              <div
                className="actorCard"
                onClick={() => handleActorClick(actor.personId)}
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
                    height="100"
                    image={"https://image.tmdb.org/t/p/w500"+actor.profilePath}
                    alt={actor.name}
                  />
                  <div className="cardContent">
                    <CardContent>
                      <Tooltip title={actor.name} placement="top">
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          className="actorName"
                        >
                          {actor.name.split(" ").map((part, index) => (
                            <div key={index}>{part}</div>
                          ))}
                        </Typography>
                      </Tooltip>
                      {/* <div className="actorCharacter">
                        <Tooltip title={actor.name} placement="bottom">
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className="actorCharacter"
                          >
                            as {actor.name}
                          </Typography>
                        </Tooltip>
                      </div> */}
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

export default ActorCast;
