import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button, Container } from "@mui/material";
import ImageUploader from "../Client/NewTicket/ImageUploader";
import axios from 'axios';

const Alerts = () => {
  const [file, setFile] = useState(null);
  const [coords, setCoords] = useState({});
  const [inputValues, setInputValues] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { status } = await axios.post(`https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/send-email`, inputValues )
  };


  return (
    <Container maxWidth='md' sx={{marginTop: 3, marginBottom: 3, minWidth: "100%" }}>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Publish a notification
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Title"
          sx={{ marginBottom: 3, borderRadius: 15 }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Describe a problem in details"
          multiline
          rows={4}
          sx={{ marginBottom: 3, borderRadius: 15 }}
        />   
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100%", marginTop: 3 }}
        >
          Publish
        </Button>
      </Paper>
    </Container>
  );
};

export default Alerts;
