import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { MdCheckCircleOutline, MdBlock, MdAccessTime } from "react-icons/md";

const StatusChip = ({ status }) => {

  const convertNumberToColor = () => {
    switch (status) {
      case 0:
        return "warning";
      case 1:
        return "success";
      case 2:
        return "error";
    }
  };

  const convertNumberToLabel = () => {
    switch (status) {
      case 0:
        return "U tijeku";
      case 1:
        return "Validirano";
      case 2:
        return "Odbijeno";
    }
  };

  return (
    <Chip
      icon={
        status === 0 ? (
          <MdAccessTime />
        ) : status === 1 ? (
          <MdCheckCircleOutline />
        ) : (
          <MdBlock />
        )
      }
      label={convertNumberToLabel()}
      variant="outlined"
      color={convertNumberToColor()}
    />
  );
};

export default StatusChip;
