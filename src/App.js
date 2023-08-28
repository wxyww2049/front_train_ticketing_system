import logo from "./logo.svg";
import "./App.css";
import { BaseRouter } from "./router/router";
import { Paper } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Paper
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "100vh",
          maxHeight: "100vh",
        }}
        elevation={3}
      >
        <BaseRouter />
      </Paper>
    </div>
  );
}

export default App;
