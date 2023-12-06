import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { DataGrid } from "@mui/x-data-grid";
import { CastColumns } from "./columns/castColumns";
import { useNavigate } from "react-router-dom";

const PersonCastCreditsList: React.FC = () => {
  const cast = useSelector((state: RootState) => state.personCredits.cast);

  const creditsLoading = useSelector(
    (state: RootState) => state.personCredits.loading
  );
  const creditsError = useSelector(
    (state: RootState) => state.personCredits.error
  );

  const navigate = useNavigate();

  function handleMovieClick(id: number) {
    navigate(`/movie/${id}`);
  }

  if (creditsLoading) {
    return <div>Loading...</div>;
  }

  if (creditsError) {
    return <div>Error: {creditsError}</div>;
  }

  const rows = cast.map((cast) => ({
    id: cast.movieId,
    title: cast.title,
    character: cast.character,
    releaseDate: cast.releaseDate,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={CastColumns}
      onRowClick={(params: any) => handleMovieClick(params.row.id)}
      pageSizeOptions={[10, 20, 30, 100]}
    />
  );
};

export default PersonCastCreditsList;
