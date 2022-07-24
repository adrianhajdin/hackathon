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
  Container,
} from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";


const ContainerManagement = () => {
  /*   const [data, setData] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      `https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/containers/get-all-containers`
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []); */

  const data = {
    statusCode: 200,
    containers: [
      {
        x: "45.3271",
        y: "14.4422",
        volume: "1000",
        typeOfContainer: "metal",
        fillPercentage: "60",
        address: "Mladenici 69",
        id: "5a7e3cc4b51941b1a325213c30fdb4c5",
      },
      {
        x: "45.3271",
        y: "14.4422",
        volume: "1000",
        typeOfContainer: "metal",
        fillPercentage: "95",
        address: "Avelina Turka 2a",
        id: "d4362cf1edb745ad81ec8b5cfca52205",
      },
    ],
  };


  const progressColor = (percentage) => {
    let hex = "";
    percentage < 90 ? hex = "#2BAF66" : hex = "#FB4F52";
    return hex;
  }

  console.log(data);

  return (
    <Container maxWidth='md' sx={{marginTop: 3, marginBottom: 3 }}>

      <Paper elevation={5} sx={{ padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Container status
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell align="left">Fill Percentage</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="right">Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.containers.map((container) => (
                <TableRow
                key={container.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{container.address}</TableCell>
                  <TableCell align="left"><ProgressBar bgColor={progressColor(container.fillPercentage)} completed={container.fillPercentage} /></TableCell>
                  <TableCell align="left">{container.typeOfContainer}</TableCell>
                  <TableCell align="right">{container.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ContainerManagement;
