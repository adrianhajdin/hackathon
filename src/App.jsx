import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "./listItems";
import Header from "./components/Header/Header";
import ListComp from "./components/List/ListComp";
import Map from "./components/Map/Map";
import Alerts from "./components/Admin/Alerts";
import Driver from "./pages/Driver/Driver";

import { Autocomplete } from "@react-google-maps/api";

import SearchIcon from "@mui/icons-material/Search";

import useSupercluster from "use-supercluster";
import { useLocation, useNavigate } from "react-router-dom";
import containers from "./data/kontejner.json";
import NewTicket from "./components/Client/NewTicket/NewTicket";
import TicketStatus from "./components/Client/TicketStatus/TicketStatus";
import ContainerManagement from "./components/Admin/ContainerManagement";
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const App = (props) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    const data = await axios.get(
      `https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/tickets/get-all-tickets`
    );
    setTickets(data.data.tickets);
  };

  useEffect(() => {
    getTickets();
    console.log(data);
  }, []);

  const [type, setType] = useState("trash");
  const [zoom, setZoom] = useState(17);
  const [data, setData] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [newBounds, setNewBounds] = useState(null);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const filteredData = containers.result.records
      .filter(
        (c) =>
          Number(c.Y.replace(",", ".")) < newBounds?.ne?.lat &&
          Number(c.X.replace(",", ".")) < newBounds?.ne?.lng &&
          Number(c.Y.replace(",", ".")) > newBounds?.sw?.lat &&
          Number(c.X.replace(",", ".")) > newBounds?.sw?.lng
      )
      .slice(0, 3000)
      .map((place) => ({
        id: place._id,
        vrstaPosude: place["VRSTA OTPADA"],
        volumen: place.VOLUMEN,
        lokacija: place.LOKACIJA,
        type: "Kontejner",
        properties: {
          cluster: false,
          category: "kontejner",
          id: place._id,
        },
        geometry: {
          type: "Point",
          coordinates: [
            Number(place?.X?.replace(",", ".")),
            Number(place?.Y?.replace(",", ".")),
          ],
        },
      }));

    setData(filteredData);

    setIsLoading(false);
    // setTimeout(() => {

    //   setIsLoading(false)
    // }, 2000);
  }, [newBounds]);

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  // useEffect(() => {
  //   console.log(clusters);
  //   console.log(supercluster);
  // }, [clusters, supercluster]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  const navigator = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('profile');
    navigator('/admin/sign-in');
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Eco Rijeka
            </Typography>
            
            <Box display="flex">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div
              style={{
                position: "relative",
                marginRight: 2,
                marginLeft: 0,
                width: "100%",
              }}
            >
              <div
                style={{
                  padding: 2,
                  height: "100%",
                  position: "absolute",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                sx={{
                  color: "white",
                  input: { padding: 2, paddingLeft: 4, width: "100%" },
                }}
              />
            </div>
          </Autocomplete>
        </Box>
            <LogoutIcon onClick={logout}/>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          {props.window === "new-ticket" ? (
            <NewTicket />
          ) : props.window === "ticket-status" ? (
            <TicketStatus />
          ) : props.window === "alerts" ? (
            <Alerts />
          ) : props.window === "driver" ? (
            <Driver />
          ) : props.window === "container" ? (
            <ContainerManagement />
          ) : (
            <>
              <Grid container spacing={3} sx={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                  <ListComp
                    childClicked={childClicked}
                    places={data}
                    type={type}
                    tickets={tickets}
                    setType={setType}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Map
                    setChildClicked={setChildClicked}
                    setBounds={setBounds}
                    setCoords={setCoords}
                    coords={coords}
                    isLoading={isLoading}
                    places={data}
                    supercluster={supercluster}
                    clusters={clusters}
                    setNewBounds={setNewBounds}
                    setZoom={setZoom}
                    setIsLoading={setIsLoading}
                    type={type}
                    tickets={tickets}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
