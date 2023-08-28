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
    console.log(info);
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

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          top: 0,
          width: "100%",

          maxWidth: "400px",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#007aff",
            color: "#ffffff",
          }}
        >
          <Box>
            {info.from.name}
            {"<>"} {info.to.name}
          </Box>
          <Box>{moment(info.date).format("M月D日")}</Box>

          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            sx={{ position: "fixed" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        sx={{
          marginTop: "70px",
          height: "calc(100vh - 70px)",
          overflowY: "scroll",
        }}
      >
        {tickets?.map((item, index) => (
          <div>
            <TrainsCard data={item} />
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
