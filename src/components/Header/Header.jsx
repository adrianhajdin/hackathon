import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ onLoad, onPlaceChanged }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#161B22" }}>
      <Toolbar
        sx={{
          display: "flex",
          color: "white",
        }}
      >
      
        <Typography variant="h5" sx={{ display: { sm: "none", md: "block" } }}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
