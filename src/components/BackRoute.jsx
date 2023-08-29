import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackRoute() {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => {
        navigate(-1);
      }}
      sx={{ position: "fixed" }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
}
