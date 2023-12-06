// SearchBar.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonSearchResults } from "../../../thunks/personThunks";
import { AppDispatch, RootState } from "../../../store";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { PersonInfo } from "../../../model/personInfo";

export interface SearchItem {
  type: string;
  name: string;
  id: number;
}

interface SearchBarProps {
  onSearchSelect: (value: SearchItem | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchResults = useSelector(
    (state: RootState) => state.personSearch.currentPersonSearch
  );
  const loading = useSelector((state: RootState) => state.personSearch.loading);

  useEffect(() => {
    if (open && searchText.trim() !== "") {
      dispatch(fetchPersonSearchResults(searchText));
    }
  }, [searchText, open, dispatch]);

   // Map PersonInfo array to SearchItem array
   const searchItems = searchResults.map((personInfo: PersonInfo) => ({
    type: 'personInfo', // or use appropriate logic to determine type
    name: personInfo.name,
    id: personInfo.id,
}));



  return (
    <Autocomplete
      open={open}
      sx={{ width: 300 }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue) => setSearchText(newInputValue)}
      getOptionLabel={(option: SearchItem) => option.name}
      options={searchItems}
      loading={loading}
      onChange={(event, value) => onSearchSelect(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
