import React, { useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useNavigate, Navigate, Link } from "react-router-dom";

export const mainListItems = (
  <>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Live Map" />
      </ListItemButton>
    </Link>
    <Link to="/container-management">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Containers" />
      </ListItemButton>
    </Link>
    <Link to="/alerts">
      <ListItemButton>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Alert System" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customer Service" />
    </ListItemButton>
  </>
);
