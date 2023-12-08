// SearchBar.tsx
import React, { useState, useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonSearchResults } from "../../../thunks/personThunks";
import { fetchMovieSearchResults } from "../../../thunks/movieThunks";
import { AppDispatch, RootState } from "../../../store";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Movie } from "../../../model/movie";
import { PersonInfo } from "../../../model/personInfo";
import { Genre } from "../../../model/genre";
import { clearMovieSearch } from "../../../slices/movieSearchSlice";
import { clearPersonSearch } from "../../../slices/personSearchSlice";
import dayjs from "dayjs";

export interface SearchItem {
  type: string;
  name: string;
  id: number;
  profilePath: string | null;
  popularity: number;
  genres: Genre[] | null;
  releaseDate: string | null;
}

interface SearchBarProps {
  onSearchSelect: (value: SearchItem | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const personSearchResults = useSelector(
    (state: RootState) => state.personSearch.currentPersonSearch
  );
  const movieSearchResults = useSelector(
    (state: RootState) => state.movieSearch.currentMovieSearch
  );
  const loading = useSelector(
    (state: RootState) =>
      state.personSearch.loading || state.movieSearch.loading
  );

  // State for the anchor element of the dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  // New state to store combined search items
  const [combinedSearchItems, setCombinedSearchItems] = useState<SearchItem[]>(
    []
  );

  // Function to handle opening the dropdown menu
  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Function to handle closing the dropdown menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Function to handle selecting a search type (Movies or People)
  const handleSelect = (type: string) => {
    setSearchType(type);
    handleMenuClose();
  };

  useEffect(() => {
    // Reset the search items when the search type changes
    setCombinedSearchItems([]);
    dispatch(clearMovieSearch());
    dispatch(clearPersonSearch());
    if (autocompleteOpen && searchText.trim() !== "") {
      if (searchType === "personInfo") {
        dispatch(fetchPersonSearchResults(searchText));
      } else if (searchType === "movie") {
        dispatch(fetchMovieSearchResults(searchText));
      }
    }
  }, [searchText, autocompleteOpen, searchType, dispatch]);

  // Update combined search items when person or movie search results change
  useEffect(() => {
    const newSearchItems = [
      ...personSearchResults.map((personInfo: PersonInfo) => ({
        type: "personInfo",
        name: personInfo.name,
        id: personInfo.id,
        profilePath: personInfo.profilePath,
        popularity: personInfo.popularity,
        genres: null,
        releaseDate: null,
      })),
      ...movieSearchResults.map((movie: Movie) => ({
        type: "movie",
        name: movie.title,
        id: movie.id,
        profilePath: movie.posterPath,
        popularity: movie.voteAverage,
        genres: movie.genres,
        releaseDate: movie.releaseDate,
      })),
    ];

    setCombinedSearchItems(newSearchItems);
  }, [personSearchResults, movieSearchResults]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Autocomplete
        sx={{ width: 400 }}
        open={autocompleteOpen}
        onOpen={() => setAutocompleteOpen(true)}
        onClose={() => setAutocompleteOpen(false)}
        onInputChange={(event, newInputValue) => setSearchText(newInputValue)}
        getOptionLabel={(option: SearchItem) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={combinedSearchItems}
        loading={loading}
        onChange={(event, value) => onSearchSelect(value)}
        renderOption={(props, option: SearchItem) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.id}
          >
            <img
              style={{ transform: "scale(0.9)" }}
              loading="lazy"
              width="20"
              srcSet={
                option.profilePath
                  ? `https://image.tmdb.org/t/p/w500${option.profilePath}`
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/120px-User-avatar.svg.png?20201213175635"
              }
              src={
                option.profilePath
                  ? `https://image.tmdb.org/t/p/w500${option.profilePath}`
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/120px-User-avatar.svg.png?20201213175635"
              }
              alt={option.name}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1">{option.name}</Typography>
              {option.type === "movie" && (
                <>
                  <Typography variant="body2">
                    {option.genres
                      ?.map((genre: Genre) => genre.name)
                      .join(", ") || ""}
                  </Typography>
                  <Typography variant="body2">
                    {dayjs(option.releaseDate).format("MMM YYYY")}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle search type dropdown"
                    aria-controls="search-type-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleSelect("personInfo")}>
                      People
                    </MenuItem>
                    <MenuItem onClick={() => handleSelect("movie")}>
                      Movies
                    </MenuItem>
                  </Menu>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <SearchIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
