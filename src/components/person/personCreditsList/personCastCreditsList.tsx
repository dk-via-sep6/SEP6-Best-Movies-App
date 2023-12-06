import {  useSelector } from "react-redux";
import {  RootState } from "../../../store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const PersonCastCreditsList: React.FC = () => {
  const cast = useSelector((state: RootState) => state.personCredits.cast);

  const creditsLoading = useSelector(
    (state: RootState) => state.personCredits.loading
  );
  const creditsError = useSelector(
    (state: RootState) => state.personCredits.error
  );


  if (creditsLoading) {
    return <div>Loading...</div>;
  }

  if (creditsError) {
    return <div>Error: {creditsError}</div>;
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Character</StyledTableCell>
            <StyledTableCell align="right">Release Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cast.map((cast) => (
            <StyledTableRow key={cast.movieId}>
              <StyledTableCell component="th" scope="row">
                {cast.title}
              </StyledTableCell>
              <StyledTableCell align="right">{cast.character}</StyledTableCell>
              <StyledTableCell align="right">{cast.releaseDate}</StyledTableCell>             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PersonCastCreditsList;
