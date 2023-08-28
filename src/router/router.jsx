import { Route, HashRouter, Routes, Outlet } from "react-router-dom";
import { Children, useState } from "react";
import NavigateBar from "../components/NavigateBar";
import { Box } from "@mui/material";
import QueryPage from "../page/QueryPage";
import Orders from "../page/Orders";
import Profile from "../page/Profile";
export const BaseRouter = () => (
  <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Index val={1}>
            <QueryPage />
          </Index>
        }
      />
      <Route
        path="order"
        element={
          <Index val={2}>
            <Orders />
          </Index>
        }
      />
      <Route
        path="profile"
        element={
          <Index val={3}>
            <Profile />
          </Index>
        }
      />
    </Routes>
  </HashRouter>
);

const Index = (props) => {
  return (
    <Box>
      {props.children}

        <NavigateBar value={props.val}></NavigateBar>
      
    </Box>
  );
};
