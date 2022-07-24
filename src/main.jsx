import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import React from 'react'
import { CssBaseline } from '@mui/material';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NewTicket from "./components/Client/NewTicket/NewTicket";
import TicketStatus from "./components/Client/TicketStatus/TicketStatus";
import Alerts from "./components/Admin/Alerts";
import ContainerManagement from "./components/Admin/ContainerManagement"
import App from './App'
import './index.css'
import Driver from "./pages/Driver/Driver";

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
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
          <Route path="/driver" element={<Driver />} />
        </Routes>
      </BrowserRouter>
    </>
)

