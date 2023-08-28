import { Box, CircularProgress } from "@mui/material";
import React from "react";
import loadingImg from "../assets/loading.gif";
import "./loading.css";
export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: "200px",
        gap: 2,
      }}
    >
      {/* <CircularProgress color="primary" size="lg" sx={{ width: 100 }} /> */}
      <img className="loadingImg" src={loadingImg} />
    </Box>
  );
}
