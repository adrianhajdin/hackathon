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


const TicketManagement = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/containers/get-all-containers` );
      
      setData(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div>
      {data && 
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Container status
        </Typography>

    {/*     <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
 */}
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
              {console.log(data)}
              {data?.containers?.map((container) => (
                <TableRow
                key={container.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{container.address}</TableCell>
<<<<<<< HEAD
                  <TableCell align="left"><ProgressBar bgColor="#2BAF66" completed={container.fillPercentage} /></TableCell>
=======
                  <TableCell align="left"><ProgressBar bgColor={progressColor(container.fillPercentage)} completed={container.fillPercentage} /></TableCell>
>>>>>>> 8627ae89c99a0fa9fbf7a35c33d1525df6faf60e
                  <TableCell align="left">{container.typeOfContainer}</TableCell>
                  <TableCell align="right">{container.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
<<<<<<< HEAD
      </Paper>}
    </div>
=======
      </Paper>
    </Container>
>>>>>>> 8627ae89c99a0fa9fbf7a35c33d1525df6faf60e
  );
};

export default TicketManagement;
