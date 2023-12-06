import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import Paper from '@mui/material/Paper';

const PersonCrewCreditsList: React.FC = () => {
  const crew = useSelector((state: RootState) => state.personCredits.crew);

  const creditsLoading = useSelector(
    (state: RootState) => state.personCredits.loading
  );
  const creditsError = useSelector(
    (state: RootState) => state.personCredits.error
  );

  // Handle loading and error states
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  })); 

  return (  
    <TableContainer component={Paper}>
   <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Title</StyledTableCell>
        <StyledTableCell align="right">Job</StyledTableCell>
        <StyledTableCell align="right">Department</StyledTableCell>
        <StyledTableCell align="right">Release Date</StyledTableCell>

      </TableRow>
    </TableHead>
    <TableBody>
      {crew.map((crew) => (
        <StyledTableRow key={crew.movieId}>
          <StyledTableCell component="th" scope="row">
            {crew.title}
          </StyledTableCell>
          <StyledTableCell align="right">{crew.job}</StyledTableCell>
          <StyledTableCell align="right">{crew.department}</StyledTableCell>
          <StyledTableCell align="right">{crew.releaseDate}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table> 
</TableContainer>);
};

export default PersonCrewCreditsList;
