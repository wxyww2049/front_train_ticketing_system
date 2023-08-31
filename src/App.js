import logo from "./logo.svg";
import "./App.css";
import { BaseRouter } from "./router/router";
import { Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./query/CustomQueryClient";
import React from "react";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="App">
            <Paper
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "100vh",
                maxHeight: "100vh",
                overflowY: "auto",
                backgroundColor: "#d7d7d747",
              }}
              elevation={3}
            >
              <BaseRouter />
            </Paper>
          </div>
        </LocalizationProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
