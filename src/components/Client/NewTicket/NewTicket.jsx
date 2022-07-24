import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Container } from "@mui/material";
import ImageUploader from "./ImageUploader";

const NewTicket = () => {
  const [file, setFile] = useState(null);
  const [coords, setCoords] = useState({});
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    x: "",
    y: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { status } = await axios.post(`https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/tickets/add-ticket`, inputValues )
  };

  const fetchCoords = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
        setInputValues({...inputValues, x:latitude, y:longitude});
      }
    );
  };

  return (
    <Container maxWidth='md' sx={{marginTop: 3, marginBottom: 3 }}>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Create a ticket
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
           <Typography variant="h6" sx={{ marginBottom: 3 }}>
          Location
        </Typography>
        <Button
          onClick={fetchCoords}
          variant="outlined"
          sx={{ marginBottom: 0 }}
        >
          Use my location
        </Button>
          {typeof(coords.lat) !== 'undefined' ? `(${coords.lat} ${coords.lng})` : ""}
        <ImageUploader file={file} setFile={setFile} />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100%", marginTop: 3 }}
        >
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default NewTicket;
