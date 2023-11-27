import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Director } from "../../model/director";
import "./styles.css";
import { useNavigate } from "react-router-dom";
interface DirectorCastProps {
  directors: Director[];
}

const DirectorCast: React.FC<DirectorCastProps> = ({ directors }) => {
  const navigate = useNavigate();

  const navigateToDirectorPage = (directorId: number) => {
    navigate(`/director/${directorId}`);
  };
  return (
    <div className="directorsCastContainer">
      <Typography variant="h5">Directors</Typography>
      <div className="directorsCastContainer">
        <Grid container spacing={2}>
          {directors.map((director) => (
            <Grid item key={director.id}>
              <div
                className="directorCard"
                onClick={() => {
                  navigateToDirectorPage(director.id);
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
                    image={director.profilePath}
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
