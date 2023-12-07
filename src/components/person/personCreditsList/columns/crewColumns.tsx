import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export const CrewColumns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    flex: 2,
  },
  {
    field: "job",
    headerName: "Job",
    flex: 1,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "releaseDate",
    headerName: "Release Date",
    flex: 1,
    align: "right",
    headerAlign: "right",
    renderCell: (params) => {
      return (
        <Typography variant="body2">
          {dayjs(params.value).format("DD MMM YYYY")}
        </Typography>
      );
    },
  },
];