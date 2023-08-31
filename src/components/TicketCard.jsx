import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function TicketCard(props) {
  const { data } = props;
  useEffect(() => {
    console.log(data);
  });
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
            <Typography fontSize={13}>{data.startStationName}</Typography>
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
              {calculateTime(data.startTime, data.endTime)}
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
              {data.endTime.substring(0, 5)}
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
            <Typography fontSize={13}>{data.endStationName}</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Typography fontSize={13}>
          {data?.tickets[0]?.date ? "发车时间:" + data.tickets[0].date : "  "}
        </Typography>
        <Typography fontSize={13}>车票仅限当日有效</Typography>
      </Box>
    </Paper>
  );
}
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
