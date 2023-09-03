import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { TRANSFERURL } from "../constants/url";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import Topbar from "../components/Topbar";
import BackRoute from "../components/BackRoute";
import moment from "moment/moment";
import Loading from "../components/Loading";
import FindFail from "../components/FindFail";
import TransferCard from "../components/TransferCard";
import TrainsCard from "../components/TrainsCard";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
export default function TransferPage() {
  const location = useLocation();
  const info = location.state?.data ?? location.state;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tickets, setTicktes] = useState([]);

  const { mutate, isSuccess, isError, data, error, isLoading } = useMutation(
    ["queryTransfer"],
    postQueryFn
  );
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      enqueueSnackbar("请先登录", { variant: "warning" });
      navigate("/login", { state: { url: "/queryTransfer", data: info } });
      return;
    }
    mutate({
      url: TRANSFERURL,
      params: {
        startStation: info.from.code,
        endStation: info.to.code,
        date: info.date,
      },
      method: "post",
      useToken: true,
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data.data.data);
      setTicktes(data.data.data);
      console.log(data.data.data);
    }
  }, [isSuccess]);

  return (
    <Box>
      <Topbar>
        <Box>转乘方案</Box>
        <Box>
          {" "}
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isSuccess &&
          tickets?.map((item, index) => (
            <Paper
              sx={{
                width: "90%",
                // height: 350,
                backgroundColor: "#dfdfdf",
                marginBottom: 3,
                padding: 1,
              }}
            >
              {/* <Box sx={{ marginTop: 2 }}> */}
              <TrainsCard data={item.firstRoute} flag={0} />
              <TrainsCard data={item.secondRoute} flag={0} />
              {/* </Box> */}
              <Button
                variant="contained"
                sx={{ width: 220, marginTop: 2 }}
                onClick={() => {
                  navigate("/buyTicket", {
                    state: {
                      data: [
                        { ...item.firstRoute, date: info.date },
                        { ...item.secondRoute, date: info.date },
                      ],
                      flag: 0,
                    },
                  });
                }}
              >
                去下单
              </Button>
            </Paper>
          ))}
        {isLoading && <Loading />}
        {isSuccess &&
          (tickets == null ||
            tickets === undefined ||
            tickets.length === 0) && <FindFail />}
      </Box>
    </Box>
  );
}
