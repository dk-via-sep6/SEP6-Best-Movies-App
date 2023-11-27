//topbar.tsx

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/images/best_movie_invert_16x16.png";

import "./style.css";
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  ThemeProvider,
  createTheme,
  Autocomplete,
  TextField,
} from "@mui/material";
import { placeholderMovies } from "../../pages/movies/placeholderMovies";
import { placeholderActors } from "../../pages/actors/placeholderActors";
import { placeholderDirectors } from "../../pages/directors/placeholderDirectors";
import { type } from "os";
import { Actor } from "../../model/actor";
import { Director } from "../../model/director";
import { Movie } from "../../model/movie";

interface TopBarProps {
  onMenuClick: () => void;
}

const settings = ["Profile", "Logout"];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  interface SearchItem {
    type: string;

    name: string;
    id: number;
  }

  const searchData: SearchItem[] = [
    ...placeholderMovies.map((movie: Movie) => {
      return {
        type: "movie",

        name: movie.title,
        id: movie.id,
      };
    }),
    ...placeholderActors.map((actor: Actor) => {
      return {
        type: "actor",

        name: actor.name,
        id: actor.id,
      };
    }),
    ...placeholderDirectors.map((director: Director) => {
      return {
        type: "director",

        name: director.name,
        id: director.id,
      };
    }),
  ];

  const handleMenuItemClick = (setting: string) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Profile":
        navigate("/account");
        break;
      case "Logout":
        // Handle logout logic here
        navigate("/login");
        break;
      default:
        // Default action or navigation if needed
        break;
    }
  };
  const handleIconClick = () => {
    navigate("/movies");
  };
  const handleSearchSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: SearchItem | null
  ) => {
    if (!value) return; // Do nothing if no value is selected

    // Navigate based on the type of the selected item
    switch (value.type) {
      case "movie":
        navigate(`/movie/${value.id}`);
        break;
      case "actor":
        navigate(`/actor/${value.id}`);
        break;
      case "director":
        navigate(`/director/${value.id}`);
        break;
      default:
        break;
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" component="nav">
        <Toolbar disableGutters>
          <div className="left-section">
            <Box className="menu-box">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onMenuClick}
                color="inherit"
                className="menu-icon"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <img
              src={Icon}
              alt="BMD"
              className="icon"
              onClick={handleIconClick}
              style={{ cursor: "pointer" }}
            />

            <div>
              <Autocomplete
                className="searchbar"
                options={searchData}
                onChange={handleSearchSelect}
                sx={{
                  width: 400,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search Movies" />
                )}
                getOptionLabel={(option: SearchItem) => {
                  return option.name;
                }}
                clearOnEscape
                noOptionsText=""
                filterOptions={(options, { inputValue }) => {
                  // Only show options if there is some input
                  if (inputValue === "") {
                    return [];
                  }
                  // Filter options based on the input value
                  return options.filter((option) =>
                    option.name.toLowerCase().includes(inputValue.toLowerCase())
                  );
                }}
              />
            </div>
          </div>

          <div className="right-section">
            <Box className="user-box">
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  className="avatar-icon"
                >
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="menu-dropdown"
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuItemClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </ThemeProvider>
  );
};

export default TopBar;
