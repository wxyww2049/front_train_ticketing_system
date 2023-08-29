import { Route, HashRouter, Routes, Outlet } from "react-router-dom";
import { Children, useState } from "react";
import NavigateBar from "../components/NavigateBar";
import { Box } from "@mui/material";
import QueryPage from "../page/QueryPage";
import Orders from "../page/Orders";
import Profile from "../page/Profile";
import TicketsPage from "../page/TicketsPage";
import LoginPage from "../page/LoginPage";
import BuyTicketPage from "../page/BuyTicketPage";
import SignupPage from "../page/SignupPage";
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
      <Route path="/login" element={<LoginPage />} />

      <Route path="/querytickets" element={<TicketsPage />} />
      <Route path="/buyTicket" element={<BuyTicketPage />} />
      <Route path="signup" element={<SignupPage />} />
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
      <Route
        path="*"
        element={
          <Index val={1}>
            <QueryPage />
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
