import { Box, Divider, Paper, Typography } from "@mui/material";
import moment from "moment/moment";
import React from "react";
const dataa = {
  trainNo: "1c0000D13400",
  trainClassName: "动车",
  trainCode: "D134",
  fromStation: "吉林",
  fromStationCode: 659,
  toStation: "方正",
  toStationCode: 468,
  startTime: "18:40:00",
  arriveTime: "21:48:00",
  wz: 173.5,
  m: 279.5,
  o: 173.5,
  a9: null,
  a1: null,
  a4: null,
  a3: null,
  cntWz: 0,
  cntM: 156,
  cntO: 686,
  cntA9: 0,
  cntA1: 0,
  cntA4: 0,
  cntA3: 0,
  start: false,
  end: false,
};
export default function TrainsCard(props) {
  const { data } = props;
  return (
    <Paper
      elevation={3}
      sx={{
        margin: 1,
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: 80,
        }}
      >
        <Box
          sx={{
            width: 100,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {data.startTime.substring(0, 5)}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.start ? <ShiCard /> : <GuoCard />}
            <Typography fontSize={13}>{data.fromStation}</Typography>
          </Box>
        </Box>
        <Box flex={1}></Box>
        <Box sx={{ width: 70 }}>
          <Box
            sx={{
              height: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="h7" fontWeight={500}>
              {data.trainCode}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography fontSize={10}>
              {calculateTime(data.startTime, data.arriveTime)}
            </Typography>
          </Box>
        </Box>
        <Box flex={1}></Box>
        <Box sx={{ width: 100 }}>
          <Box
            sx={{
              height: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              {data.arriveTime.substring(0, 5)}
            </Typography>
          </Box>
          <Box
            sx={{
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.end ? <ZhongCard /> : <GuoCard />}

            <Typography fontSize={13}>{data.toStation}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: "2px" }} />
      <Box sx={{ height: 30 }}>
        {data.trainClassName === "高速" || data.trainClassName == "动车" ? (
          <GaotieCnt value={data} />
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
}
const GaotieCnt = (props) => {
  const { value } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>商务:{value.cntA9}张</Typography>
      </Box>
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>一等:{value.cntM}张</Typography>
      </Box>{" "}
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>二等:{value.cntO}张</Typography>
      </Box>{" "}
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>无座:{value.cntWz}张</Typography>
      </Box>
    </Box>
  );
};
const ShiCard = () => {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        backgroundColor: "#f1a213",
      }}
    >
      <Typography fontSize={5} sx={{ color: "#ffffff" }}>
        始
      </Typography>
    </Box>
  );
};
const ZhongCard = () => {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        backgroundColor: "#1c8c4a",
      }}
    >
      <Typography fontSize={5} sx={{ color: "#ffffff" }}>
        终
      </Typography>
    </Box>
  );
};
const GuoCard = () => {
  return (
    <Box
      sx={{
        width: 15,
        height: 15,
        backgroundColor: "#0079ff",
      }}
    >
      <Typography fontSize={5} sx={{ color: "#ffffff" }}>
        过
      </Typography>
    </Box>
  );
};
const calculateTime = (timeString1, timeString2) => {
  // 解析时间字符串并计算相差时间
  const time1Parts = timeString1.split(":");
  const time2Parts = timeString2.split(":");

  const hours1 = parseInt(time1Parts[0], 10);
  const minutes1 = parseInt(time1Parts[1], 10);

  const hours2 = parseInt(time2Parts[0], 10);
  const minutes2 = parseInt(time2Parts[1], 10);

  // 将时间转换为分钟并计算差值
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  const timeDifference = Math.abs(totalMinutes2 - totalMinutes1);

  // 将差值转换回 "hh:mm" 格式
  const hoursDiff = Math.floor(timeDifference / 60);
  const minutesDiff = timeDifference % 60;

  const formattedDiff = `${hoursDiff.toString()}时${minutesDiff.toString()}分`;
  return formattedDiff;
};
