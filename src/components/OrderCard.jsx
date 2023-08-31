import { Box, Button, Paper, Typography } from "@mui/material";
import DirectionsRailwayFilledOutlinedIcon from "@mui/icons-material/DirectionsRailwayFilledOutlined";
import React, { useEffect } from "react";
import { green, grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
const tmpdata = {
  id: 1,
  status: 1,
  startStationCode: 3,
  endStationCode: 84,
  startStationName: "北京南",
  endStationName: "济南东",
  trainNo: "240000G20320",
  trainCode: "G203",
  isStart: 0,
  isEnd: 0,
  price: null,
  startTime: "08:08:00",
  endTime: "09:58:00",
  arriveDayDiff: 0,
  userId: 1,
  tickets: [
    {
      id: 64,
      status: 1,
      startStationCode: 3,
      endStationCode: 84,
      startStationName: "北京南",
      endStationName: "济南东",
      trainNo: "240000G20320",
      trainCode: "G203",
      isStart: 0,
      isEnd: 0,
      price: 200.0,
      seat: 843,
      startTime: "08:08:00",
      endTime: "09:58:00",
      arriveDayDiff: 0,
      seatType: 4,
      userId: 1,
      name: "huq",
      idCode: "123654789654",
      orderId: 28,
      date: "2023-08-31",
    },
    {
      id: 65,
      status: 1,
      startStationCode: 3,
      endStationCode: 84,
      startStationName: "北京南",
      endStationName: "济南东",
      trainNo: "240000G20320",
      trainCode: "G203",
      isStart: 0,
      isEnd: 0,
      price: 200.0,
      seat: 842,
      startTime: "08:08:00",
      endTime: "09:58:00",
      arriveDayDiff: 0,
      seatType: 4,
      userId: 1,
      name: "huq22",
      idCode: "12365478965323",
      orderId: 28,
      date: "2023-08-31",
    },
  ],
};

export default function OrderCard({ info }) {
  const navigate = useNavigate();
  return (
    <Paper
      onClick={() => {
        navigate("/orderdetail", { state: info });
      }}
      sx={{ height: "100px", marginTop: 2, width: "95%" }}
      elevation={3}
    >
      <Box sx={{ height: "15px", display: "flex", margin: 1 }}>
        <DirectionsRailwayFilledOutlinedIcon fontSize="small" color="success" />
        <Typography fontSize={13}>
          {info.trainCode}
          {"  "}
          {info.startStationName} — {info.endStationName}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "69px",
          display: "flex",
          backgroundColor: grey[100],
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginLeft: 3,
            display: "flex",
            flexDirection: "column",

            alignItems: "flex-start",
          }}
        >
          <Typography fontSize={10} sx={{ marginTop: "4px" }}>
            订单号:{info.id}
          </Typography>
          <Typography fontSize={10} sx={{ marginTop: "4px" }}>
            发车时间:{(info?.tickets[0]?.date ?? "") + " " + info.startTime}
          </Typography>
          <Typography fontSize={10} sx={{ marginTop: "4px" }}>
            总张数:{info.tickets.length}
          </Typography>
        </Box>
        <Box sx={{ marginRight: 2 }}>
          <Typography
            color={
              info?.status == 1
                ? "primary"
                : info?.status == 2
                ? "green"
                : "grey"
            }
          >
            {info?.status == 1
              ? "未支付"
              : info?.status == 2
              ? "已支付"
              : "已退票"}
          </Typography>
          {info?.status == 1 && (
            <a
              href={"http://train-server.wxyww.top/pay?id=" + info.id}
              target="_blank"
            >
              <Button variant="contained" size="small" sx={{ marginTop: 1 }}>
                去支付
              </Button>
            </a>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
