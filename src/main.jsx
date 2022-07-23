import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NewTicket from "./components/Client/NewTicket/NewTicket";
import TicketStatus from "./components/Client/TicketStatus/TicketStatus";
import Alerts from "./components/Admin/Alerts";
import ContainerManagement from "./components/Admin/ContainerManagement"
import App from './App'
import './index.css'

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


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/new-ticket" element={<NewTicket />} />
        <Route path="/ticket-status" element={<TicketStatus />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/container-management" element={<ContainerManagement />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

