import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export const CastColumns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "character",
    headerName: "Character",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
  {
    field: "releaseDate",
    headerName: "Release Date",
    width: 130,
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
