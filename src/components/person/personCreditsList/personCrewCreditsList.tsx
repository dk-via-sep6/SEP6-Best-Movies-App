import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { CrewColumns } from "./columns/crewColumns";

const PersonCrewCreditsList: React.FC = () => {
  const crew = useSelector((state: RootState) => state.personCredits.crew);

  const creditsLoading = useSelector(
    (state: RootState) => state.personCredits.loading
  );
  const creditsError = useSelector(
    (state: RootState) => state.personCredits.error
  );

  const navigate = useNavigate();

  function handleMovieClick(movieId: number) {
    navigate(`/movie/${movieId}`);
  }

  if (creditsLoading) {
    return <div>Loading...</div>;
  }

  if (creditsError) {
    return <div>Error: {creditsError}</div>;
  }

  const rows = crew.map((crew) => ({
    id: crew.creditId,
    movieId: crew.movieId,
    title: crew.title,
    job: crew.job,
    department: crew.department,
    releaseDate: crew.releaseDate,
  }));

  return (
    <div style={{ height: "600px" }}>
      <DataGrid
        rows={rows}
        columns={CrewColumns}
        onRowClick={(params: any) => handleMovieClick(params.row.movieId)}
        pageSizeOptions={[10, 20, 30, 100]}
        autoPageSize
      />
    </div>
  );
};

export default PersonCrewCreditsList;
