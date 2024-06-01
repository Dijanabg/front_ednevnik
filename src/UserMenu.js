import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const UserMenu = ({ user, logout }) => {
  const [anchorElUser, setAnchorEl] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const getUserDisplay = () => {
    if (user.ime && user.prezime) {
      return `${user.ime} ${user.prezime}`;
    } else {
      return user.korisnickoIme;
    }
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpenUserMenu}>
        <AccountCircle /> {getUserDisplay()}
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
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
      >
        <MenuItem> Profile </MenuItem>
        <MenuItem onClick={() => logout()}> Logout </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
