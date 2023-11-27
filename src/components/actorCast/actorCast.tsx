import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { Actor } from "../../model/actor";
import "./styles.css";
import { useNavigate } from "react-router-dom";
interface ActorCastProps {
  actors: Actor[];
}

const ActorCast: React.FC<ActorCastProps> = ({ actors }) => {
  const navigate = useNavigate();

  const handleActorClick = (actorId: number) => {
    navigate(`/actor/${actorId}`);
  };

  return (
    <div>
      <Typography variant="h5">Cast</Typography>
      <div className="actorCastContainer">
        <Grid container spacing={2}>
          {actors.map((actor) => (
            <Grid item key={actor.id}>
              <div
                className="actorCard"
                onClick={() => handleActorClick(actor.id)}
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
                    image={actor.profilePath}
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
