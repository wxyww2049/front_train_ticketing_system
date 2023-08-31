import { Box, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { QUERYTRAIN } from "../constants/url";
import TrainsCard from "../components/TrainsCard";
import Loading from "../components/Loading";
import FindFail from "../components/FindFail";
import BackRoute from "../components/BackRoute";
import Topbar from "../components/Topbar";
export default function TicketsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state;
  const [tickets, setTicktes] = useState([]);
  const {
    mutate: ticketsMutate,
    data,
    error,
    isLoading,
    isSuccess,
  } = useMutation(["ticketblbl"], postQueryFn);
  useEffect(() => {
    ticketsMutate({
      url: QUERYTRAIN,
      params: {
        startStation: info.from.code,
        endStation: info.to.code,
        date: info.date,
      },
      method: "get",
    });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setTicktes(
        data?.data?.data
          ?.sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
          ?.filter(
            (item) =>
              info.onlyGD === false ||
              item.trainClassName == "动车" ||
              item.trainClassName == "高速"
          )
      );
    }
  }, [isSuccess]);
  const buyTicket = (ticket) => {
    if (localStorage.getItem("token") === null) {
      navigate("/login", {
        state: { url: "/buyTicket", data: { ...ticket, date: info.date } },
      });
      return;
    } else {
      navigate("/buyTicket", {
        state: { data: { ...ticket, date: info.date } },
      });
    }
  };
  return (
    <Box>
      <Topbar>
        <Box>
          {info.from.name}
          {"<>"} {info.to.name}
        </Box>
        <Box>{moment(info.date).format("M月D日")}</Box>

        <BackRoute />
      </Topbar>
      <Box
        sx={{
          marginTop: "70px",
          height: "calc(100vh - 70px)",
          overflowY: "scroll",
        }}
      >
        {tickets?.map((item, index) => (
          <div onClick={() => buyTicket(item)}>
            <TrainsCard data={item} flag={0} />
          </div>
        ))}
        {isLoading && <Loading />}
        {!isLoading &&
          (tickets == null ||
            tickets === undefined ||
            tickets.length === 0) && <FindFail />}
      </Box>
    </Box>
  );
}
