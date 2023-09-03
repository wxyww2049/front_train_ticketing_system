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
import AddFellow from "../page/AddFellow";
import OrderDetail from "../page/OrderDetail";
import IdCodePage from "../page/IdCodePage";
import ManageFellow from "../page/ManageFellow";
import MyTickets from "../page/MyTickets";
import TransferPage from "../page/TransferPage";
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
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/addfellow" element={<AddFellow />} />
      <Route path="/orderdetail" element={<OrderDetail />} />
      <Route path="/changeIdCode" element={<IdCodePage />} />
      <Route path="/manageFellow" element={<ManageFellow />} />
      <Route path="/tickets" element={<MyTickets />} />
      <Route path="/queryTransfer" element={<TransferPage />} />
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
