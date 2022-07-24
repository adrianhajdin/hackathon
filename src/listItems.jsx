import React, { useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate, Navigate, Link } from "react-router-dom";

const profile = window.localStorage.getItem("profile");
let flag;
if (profile !== null) flag = JSON.parse(profile).flag;
console.log(flag);

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
    { (
      <Link to="/container-management">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Containers" />
        </ListItemButton>
      </Link>
    )}
    { (
      <Link to="/alerts">
        <ListItemButton>
          <ListItemIcon>
            <CommentIcon />
          </ListItemIcon>
          <ListItemText primary="Alert System" />
        </ListItemButton>
      </Link>
    )}
    { (
      <ListItemButton to="/driver">
        <ListItemIcon>
          <DriveEtaIcon />
        </ListItemIcon>
        <ListItemText primary="Drivers" />
      </ListItemButton>
    )}
    { (
      <ListItemButton to="/new-ticket">
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="New ticket" />
      </ListItemButton>
    )}
    { (
      <ListItemButton to="/ticket-status">
        <ListItemIcon>
          <BackupTableIcon />
        </ListItemIcon>
        <ListItemText primary="Ticket status" />
      </ListItemButton>
    )}
  </>
);
