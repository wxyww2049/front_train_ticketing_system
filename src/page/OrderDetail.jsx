import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../components/Topbar";
import TicketCard from "../components/TicketCard";
import { orange } from "@mui/material/colors";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { REFUNDTICKETURL } from "../constants/url";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

export default function OrderDetail() {
  const localtion = useLocation();
  const info = localtion.state;
  // console.log(info);
  const calcseat = (seatType, seat) => {
    if (seatType == -1) return "无座";
    var car = Math.floor(seat / 120);
    var sea = seat % 120;
    var mod = 5;
    var pai;
    var zuo;
    if (seatType == 4) {
      mod = 5;
      pai = Math.ceil(sea / mod);
      if (sea % mod === 0) zuo = "A";
      if (sea % mod === 1) zuo = "B";
      if (sea % mod === 2) zuo = "C";
      if (sea % mod === 3) zuo = "D";
      if (sea % mod === 4) zuo = "F";
    } else if (seatType == 3) {
      mod = 4;
      pai = Math.ceil(sea / mod);
      if (sea % mod === 0) zuo = "A";
      if (sea % mod === 1) zuo = "C";
      if (sea % mod === 2) zuo = "D";
      if (sea % mod === 3) zuo = "F";
    } else if (seatType == 5) {
      mod = 3;
      pai = Math.ceil(sea / mod);
      if (sea % mod === 0) zuo = "A";
      if (sea % mod === 1) zuo = "C";
      if (sea % mod === 2) zuo = "F";
    } else {
      return car + "车 " + sea + "号";
    }

    return car + "车 " + pai + zuo + "号";
  };
  const {
    isSuccess,
    isLoading,
    data,
    mutate: refund,
  } = useMutation(["refund"], postQueryFn);
  const [reflg, setReflg] = React.useState(false);
  const refundTicket = () => {
    refund({
      url: REFUNDTICKETURL,
      useToken: true,
      params: {
        orderId: info.id,
      },
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.code === 0) {
        setReflg(true);
      } else {
        enqueueSnackbar(data?.data?.message, { variant: "error" });
      }
    }
  }, [isSuccess]);
  return (
    <Box>
      <Topbar>
        <Typography>订单详情</Typography>
      </Topbar>
      <Box sx={{ marginTop: 10, zIndex: 10, position: "relative" }}>
        <TicketCard data={info} />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Paper
          sx={{
            width: "95%",
            height: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginTop: -3,
          }}
          elevation={2}
        >
          {info.status === 2 && (
            <LoadingButton
              onClick={refundTicket}
              loadingIndicator="退票中…"
              loading={isLoading}
              disabled={reflg}
            >
              {reflg ? "已退票" : "退票"}
            </LoadingButton>
          )}
          {info.status === 1 && (
            <a
              href={"http://train-server.wxyww.top/pay?id=" + info.id}
              target="_blank"
            >
              <Button>去支付</Button>
            </a>
          )}
          {info.status === 3 && <Button disabled>已退票</Button>}
        </Paper>
        <Box
          sx={{
            marginTop: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {info.tickets?.map((item) => {
            return (
              <Paper
                sx={{
                  marginTop: 2,
                  width: "95%",
                  // height: "60px",
                  justifyContent: "space-around",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography fontSize={18} fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography fontSize={12} fontWeight={500}>
                    中国居民身份证
                  </Typography>
                  <Typography fontSize={12} fontWeight={500}>
                    {item.status == 1
                      ? "未支付"
                      : item.status == 2
                      ? "已支付"
                      : "已退票"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography fontSize={12}>
                    {calcseat(item.seatType, item.seat)}
                  </Typography>
                  <Typography fontSize={13} color={orange[500]}>
                    ￥{item.price}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
