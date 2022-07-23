import React from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Typography } from "@mui/material";

const ImageUploader = ({file, setFile}) => {
  const fileTypes = ["JPEG", "PNG", "GIF"];

  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Učitaj sliku
      </Typography>

      <FileUploader
        multiple={true}
        handleChange={(file) => setFile(file)}
        name="file"
        types={fileTypes}
        classes="droparea"
      />
      <p>{file ? file[0].name : "Ni jedna slika nije učitana."}</p>
    </div>
  );
};

export default ImageUploader;
