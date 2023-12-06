// TopBar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { 
  AppBar, Box, Toolbar, IconButton, Tooltip, Avatar, Menu, MenuItem, Typography, 
  ThemeProvider, createTheme 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "../../assets/images/best_movie_invert_16x16.png";
import "./style.css";
import SearchBar, { SearchItem } from "./searchbar/searchbar";


interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { currentUser, isAnonymous, logout } = useAuth();
  const settings = !isAnonymous ? ["Profile", "Logout"] : ["Login"];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#1976d2" },
    },
  });

  const getAvatarContent = () => isAnonymous ? "?" : currentUser?.email?.charAt(0).toUpperCase() || "";

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = async (setting: string) => {
    handleCloseUserMenu();
    if (setting === "Profile") navigate("/account");
    if (setting === "Logout") {
      await logout();
      navigate("/login");
    }
    if (setting === "Login") {
      await logout();
      navigate("/login");
    }
  };

  const handleIconClick = () => {
    navigate("/movies");
  };

  const handleSearchSelect = (value: SearchItem | null) => {
    if (!value) return;
    const { type, id } = value;
    const url = type === "movie" ? `/movie/${id}` : type === "personInfo" ? `/actor/${id}` : `/director/${id}`;
    navigate(url);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" component="nav">
        <Toolbar disableGutters>
          <div className="left-section">
            <Box className="menu-box">
              <IconButton size="large" aria-label="open menu" onClick={onMenuClick} color="inherit" className="menu-icon">
                <MenuIcon />
              </IconButton>
            </Box>
            <img src={Icon} alt="BMD" className="icon" onClick={handleIconClick} style={{ cursor: "pointer" }} />
            <SearchBar onSearchSelect={handleSearchSelect} />
          </div>

          <div className="right-section">
            <Box className="user-box">
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} className="avatar-icon">
                  <Avatar alt="User Avatar">{getAvatarContent()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                className="menu-dropdown"
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
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
