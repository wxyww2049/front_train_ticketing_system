import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import failImg from "../assets/findfail.gif";
export default function FindFail(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: "200px",
        gap: 2,
      }}
    >
      {/* <CircularProgress color="primary" size="lg" sx={{ width: 100 }} /> */}
      <img className="loadingImg" src={failImg} />
      <Typography variant="subtitle1">
        {props.text ?? "什么都没有找到"}
      </Typography>
    </Box>
  );
}
