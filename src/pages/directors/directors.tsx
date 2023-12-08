import { Container, Grid, Pagination } from "@mui/material";

import "./style.css";
import DirectorGrid from "../../components/directorGrid/directorGrid";
import { placeholderDirectors } from "./placeholderDirectors";
const DirectorsPage: React.FC = () => {
  return (
    <Container>
      <Grid item xs={12}>
        {/*        <Carousel /> */}
      </Grid>
      <Grid item xs={12}>
        {/* <Autocomplete
          className="searchBar"
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Search Directors" />
          )}
          options={placeholderDirectors.map((director) => director.name)}
        /> */}
      </Grid>
      <Grid item xs={12}>
        <DirectorGrid directors={placeholderDirectors} />
      </Grid>
      <Grid item xs={12}>
        <Pagination color="primary" />
      </Grid>
    </Container>
  );
};
export default DirectorsPage;
