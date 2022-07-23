import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import ImageUploader from "./ImageUploader";

const NewTicket = () => {
  const [file, setFile] = useState(null);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    location: "",
    file: "",
  });

  const handleSubmit = () => {};

  return (
    <div>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Create a ticket
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Naslov"
          sx={{ marginBottom: 3, borderRadius: 15 }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Opis problema"
          multiline
          rows={4}
          sx={{ marginBottom: 3, borderRadius: 15 }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Lokacija"
          multiline
          rows={4}
          sx={{ marginBottom: 3, borderRadius: 15 }}
        />
        <ImageUploader file={file} setFile={setFile} />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100%" }}
        >
          Pošalji
        </Button>
      </Paper>
    </div>
  );
};

export default NewTicket;
