import { Box, Paper } from "@mui/material";
import React from "react";
import BackRoute from "./BackRoute";

export default function Topbar(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        maxWidth: "400px",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          height: 63,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#007aff",
          color: "#ffffff",
        }}
      >
        {props.children}
        {props?.flag === 0 || <BackRoute />}
      </Paper>
    </Box>
  );
}
