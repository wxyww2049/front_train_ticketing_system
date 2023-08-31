import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { GETALLORDERS } from "../constants/url";
import Loading from "../components/Loading";
import OrderCard from "../components/OrderCard";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Orders() {
  const { isLoading, isSuccess, isError, data, mutate } = useMutation(
    ["orders"],
    postQueryFn
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login", { state: { url: "/order" } });
      enqueueSnackbar("请先登录", { variant: "warning" });
      return;
    }

    mutate({
      url: GETALLORDERS,
      method: "GET",
      useToken: true,
    });
  }, []);

  return (
    <Box>
      <Topbar flag={0}>
        <Box>
          <Typography>订单</Typography>
        </Box>
      </Topbar>
      <Box
        sx={{
          marginTop: 10,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLoading && <Loading />}
        {isSuccess &&
          data?.data?.data
            ?.sort((a, b) => (a.date < b.date ? -1 : 1))
            ?.map((item) => <OrderCard info={item} />)}
        <Box sx={{ height: "200px" }}></Box>
      </Box>
    </Box>
  );
}
