import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StatusChip from "./StatusChip";

const TicketStatus = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      `https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/tickets/get-all-tickets`
    );
    setData(data.data.tickets);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  const cropDateAndTime = (date) => {
    const removed = date.split(' ')[0];
    return removed;
  }

  return (
    <div>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Ticket status
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Naslov</TableCell>
                <TableCell align="left">Opis</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Datum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((ticket) => (
                <TableRow
                  key={ticket.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ticket.title}
                  </TableCell>
                  <TableCell align="left">{ticket.description}</TableCell>
                  <TableCell align="left">
                    <StatusChip status={ticket.status} />
                  </TableCell>
                  <TableCell align="right">{cropDateAndTime(ticket.creationDateAndTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TicketStatus;
