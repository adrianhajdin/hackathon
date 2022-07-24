import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { MdCheckCircleOutline, MdBlock, MdAccessTime } from "react-icons/md";

const StatusChip = ({ status }) => {

  const convertNumberToColor = () => {
    switch (status) {
      case 0:
        return "warning";
      case 1:
        return "error";
      case 2:
        return "success";
    }
  };

  const convertNumberToLabel = () => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Denied";
      case 2:
        return "Validated";
    }
  };

  return (
    <Chip
      icon={
        status === 0 ? (
          <MdAccessTime />
        ) : status === 1 ? (
          <MdBlock />
        ) : (
          <MdCheckCircleOutline />
        )
      }
      label={convertNumberToLabel()}
      variant="outlined"
      color={convertNumberToColor()}
    />
  );
};

export default StatusChip;
