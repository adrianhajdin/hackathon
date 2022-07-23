import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import ImageUploader from "../Client/NewTicket/ImageUploader";

const Alerts = () => {
  const [file, setFile] = useState(null);
  const [coords, setCoords] = useState({});
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    file: "",
  });

  const handleSubmit = () => {};

  const fetchCoords = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
    console.log(coords);
  };

  return (
    <div>
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
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          Location
        </Typography>
        <Button
          onClick={fetchCoords}
          variant="outlined"
          sx={{ marginBottom: 3 }}
        >
          Use my location
        </Button>

        <ImageUploader file={file} setFile={setFile} />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100%", marginTop: 3 }}
        >
          Publish
        </Button>
      </Paper>
    </div>
  );
};

export default Alerts;
