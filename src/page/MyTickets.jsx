import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { GETTICKETS } from "../constants/url";
import { Box, Typography } from "@mui/material";
import Topbar from "../components/Topbar";
import Loading from "../components/Loading";
import TicketCard from "../components/TicketCard";

export default function MyTickets() {
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation(
    ["queryMyTickets"],
    postQueryFn
  );
  useEffect(() => {
    mutate({
      url: GETTICKETS,
      method: "GET",
      useToken: true,
    });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.data);
    }
  }, [isSuccess]);
  return (
    <Box>
      <Topbar>
        <Typography>我的车票</Typography>
      </Topbar>

      <Box sx={{ marginTop: 9, width: "100%" }}>
        {isLoading && <Loading />}
        {isSuccess &&
          data.data.data.map((item) => {
            return <TicketCard data={item} />;
          })}
      </Box>
    </Box>
  );
}
