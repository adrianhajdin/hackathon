import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NewTicket from "./components/Client/NewTicket/NewTicket";
import TicketStatus from "./components/Client/TicketStatus/TicketStatus";
import Alerts from "./components/Admin/Alerts";
import ContainerManagement from "./components/Admin/ContainerManagement";
import App from "./App";
import "./index.css";


const darkTheme = createTheme({
  // palette: {
  //   mode: 'dark',
  //   border: '#2BAF66',
  //   text: {
  //     primary: '#2BAF66',
  //     secondary: '#2BAF66',
  //     disabled: '#2BAF66',
  //   },
  //   action: {
  //     active: '#2BAF66',
  //     hover: 'rgba(255, 255, 255, 0.08)',
  //     selected: 'rgba(255, 255, 255, 0.16)',
  //     disabled: 'rgba(255, 255, 255, 0.3)',
  //     disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //   },
  //   background: {
  //     default:' #0D1117',
  //     paper: '#0D1117',
  //   },
  //   divider: '#2BAF66',
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/sign-in" element={<SignIn />} />
        <Route path="/admin/sign-up" element={<SignUp />} />
        <Route path="/user/sign-in" element={<SignIn />} />
        <Route path="/user/sign-up" element={<SignUp />} />
        <Route path="/new-ticket" element={<App window="new-ticket" />} />
        <Route path="/ticket-status" element={<App window="ticket-status" />} />
        <Route path="/alerts" element={<App window="alerts" />} />
        <Route path="/driver" element={<App window="driver" />} />
        <Route
          path="/container-management"
          element={<App window="container" />}
        />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
