import { NavLink, Outlet } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";

import {
  ThemeProvider,
  styled,
  useTheme,
  createTheme,
} from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
/*
Ova komponenta predstavlja 'pocetnu stranicu' za nasu aplikaciju posto smo definisali da ce njen sadrzaj da se prikaze kada pokrenom aplikaciju (path='/'). Na ovoj stranici ce biti prikazan navbar sa leve strane i on ce uvek da bude prikazani, nece se menjati kada izaberemo neku opciju tj uvek ce biti prisutan na ekranu. Pored navbara ostatak prostora ce zauzimati kontrola koja se zove <Outlet> i ona sluzi da se prikazuje sadrzaj u zavisnosti od rute na kojoj se nalazimo, a rute smo definisali u children atributu (ugnjezdene rute). 
*/

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  useEffect(() => {
    const u = localStorage.getItem("user");
    console.log(u);
    if (u) {
      setUser(JSON.parse(u));
      setIsLogin(true);
      navigate("/subjects");
    }
  }, [showModal, isLogin, navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    navigate("/");
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handlerDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleThemeChange = () => {
    setDarkMode(!isDarkMode);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListItemClick = () => {
    if (isMobile) {
      handlerDrawer();
    }
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={openDrawer}
          sx={{ backgroundColor: "#400905" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
              onClick={handlerDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-DNEVNIK
            </Typography>
            {isLogin ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <Button color="inherit" onClick={() => setShowModal(true)}>
                {" "}
                Login{" "}
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#400905",
            },
          }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={handlerDrawer}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon sx={{ color: "white" }} />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {/* uslovno renderovanje, prikaz knjiga ce da bude dostupan samo ako je ulogovani korisnik admin */}
            {/* {isLogin && user.role === "admin" ? ( */}
            <ListItem
              disablePadding
              component={NavLink}
              to="subjects"
              onClick={handleListItemClick}
            >
              <ListItemButton>
                <ListItemText primary="Predmeti" sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
            {/* ) : ( */}
            <></>
            {/* )} */}
            <Divider />
            <ListItem
              disablePadding
              component={NavLink}
              to="ucenici"
              onClick={handleListItemClick}
            >
              <ListItemButton>
                <ListItemText primary="Učenici" sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem sx={{ color: "white" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={isDarkMode} onChange={handleThemeChange} />
                  }
                  label={isDarkMode ? "Light mode" : "Dark mode"}
                />
              </FormGroup>
            </ListItem>
            <Divider />
            <Button onClick={handleClick} sx={{ color: "white" }}>
              {" "}
              Language{" "}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>ENG</MenuItem>
              <MenuItem onClick={handleClose}>SRB</MenuItem>
            </Menu>
          </List>
        </Drawer>
        <Main open={openDrawer}>
          <DrawerHeader />
          {showModal && (
            <LoginModal
              show={showModal}
              handleCloseModal={() => setShowModal(false)}
            />
          )}
          <Outlet></Outlet>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
export default App;
