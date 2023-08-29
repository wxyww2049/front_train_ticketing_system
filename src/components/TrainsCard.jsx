import {
  Box,
  Chip,
  Divider,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import React, { useContext } from "react";
import { OrderInfoContext } from "../page/BuyTicketPage";

export default function TrainsCard(props) {
  const { data, flag } = props;
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
      {flag == 0 && (
        <Box sx={{ height: 30 }}>
          {data.trainClassName === "高速" || data.trainClassName == "动车" ? (
            <GaotieCnt value={data} />
          ) : (
            <PutongCnt value={data} />
          )}
        </Box>
      )}
      {flag == 1 && (
        <Box sx={{ height: 90 }}>
          {/* <Box sx={{ display: "flex", flexDirection: "row" }}> */}
          {/* <DetailCard info={{ name: "一等", cnt: 3, price: "30" }} /> */}
          {/* </Box> */}
          <DetailLan info={data} />
        </Box>
      )}
    </Paper>
  );
}
const DetailLan = ({ info }) => {
  const { orderInfo, setOrderInfo } = useContext(OrderInfoContext);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      {info?.cntA9 > 0 && (
        <DetailCard
          info={{ type: 5, name: "商务", cnt: info.cntA9, price: info.a9 }}
        />
      )}
      {info?.cntA4 > 0 && (
        <DetailCard
          info={{ type: 2, name: "软卧", cnt: info.cntA4, price: info.a4 }}
        />
      )}
      {info?.cntM > 0 && (
        <DetailCard
          info={{ type: 3, name: "一等", cnt: info.cntM, price: info.m }}
        />
      )}
      {info?.cntO > 0 && (
        <DetailCard
          info={{ type: 4, name: "二等", cnt: info.cntO, price: info.o }}
        />
      )}
      {info?.cntA3 > 0 && (
        <DetailCard
          info={{ type: 1, name: "硬卧", cnt: info.cntA3, price: info.a3 }}
        />
      )}
      {info?.cntA1 > 0 && (
        <DetailCard
          info={{ type: 0, name: "硬座", cnt: info.cntA1, price: info.a1 }}
        />
      )}
      {info?.cntWz > 0 && (
        <DetailCard
          info={{ type: -1, name: "无座", cnt: info.cntWz, price: info.wz }}
        />
      )}
    </Box>
  );
};
const DetailCard = ({ info }) => {
  const { orderInfo, setOrderInfo } = useContext(OrderInfoContext);

  return (
    <IconButton
      onClick={() => {
        setOrderInfo({ ...orderInfo, seatType: info.type });
      }}
    >
      <Box
        sx={{
          border:
            info?.type === orderInfo.seatType
              ? "1px solid #007aff"
              : "1px solid #aca5a5",
          height: 70,
          width: 70,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          backgroundColor:
            info?.type === orderInfo.seatType ? "#007aff1c" : "white",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight={550} fontSize={14}>
          {info.name}
        </Typography>
        <Typography fontWeight={550} fontSize={10}>
          ￥{info.price}
        </Typography>
        <Typography fontWeight={550} fontSize={10}>
          {info.cnt}张
        </Typography>
      </Box>
    </IconButton>
  );
};

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
const PutongCnt = (props) => {
  const { value } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>软卧:{value.cntA4}张</Typography>
      </Box>
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>硬卧:{value.cntA3}张</Typography>
      </Box>{" "}
      <Box sx={{ width: "25%" }}>
        <Typography fontSize={13}>硬座:{value.cntA1}张</Typography>
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
