import React, { useEffect } from "react";

import WeekendIcon from "@mui/icons-material/Weekend";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import { Box, IconButton, Typography } from "@mui/material";

export default function SelectSeat(props) {
  useEffect(() => {
    console.log(props);
  });
  return (
    <Box>
      {props.type === 5 && <ShangwuCard props={props} />}
      {props.type === 3 && <YidengCard props={props} />}
      {props.type === 4 && <ErdengCard props={props} />}
    </Box>
  );
}
const ErdengCard = (props) => {
  const { value, type, click } = props.props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>窗</Typography>
      <Box onClick={() => click(0)}>
        <Seat cases="A" type={value === 0} />
      </Box>
      <Box onClick={() => click(1)}>
        <Seat cases="B" type={value === 1} />
      </Box>
      <Box onClick={() => click(2)}>
        <Seat cases="C" type={value === 2} />
      </Box>
      <Typography>过道</Typography>

      <Box onClick={() => click(3)}>
        <Seat cases="D" type={value === 3} />
      </Box>
      <Box onClick={() => click(4)}>
        <Seat cases="F" type={value === 4} />
      </Box>
      <Typography>窗</Typography>
    </Box>
  );
};
const YidengCard = (props) => {
  const { value, type, click } = props.props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>窗</Typography>
      <Box onClick={() => click(0)}>
        <Seat cases="A" type={value === 0} />
      </Box>
      <Box onClick={() => click(1)}>
        <Seat cases="C" type={value === 1} />
      </Box>
      <Typography>过道</Typography>

      <Box onClick={() => click(2)}>
        <Seat cases="D" type={value === 2} />
      </Box>
      <Box onClick={() => click(3)}>
        <Seat cases="F" type={value === 3} />
      </Box>
      <Typography>窗</Typography>
    </Box>
  );
};
const ShangwuCard = (props) => {
  const { value, type, click } = props.props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>窗</Typography>
      <Box onClick={() => click(0)}>
        <Seat cases="A" type={value === 0} />
      </Box>
      <Box onClick={() => click(1)}>
        <Seat cases="C" type={value === 1} />
      </Box>
      <Typography>过道</Typography>
      <Box onClick={() => click(2)}>
        <Seat cases="F" type={value === 2} />
      </Box>
      <Typography>窗</Typography>
    </Box>
  );
};
const Seat = ({ cases, type }) => {
  return (
    <Box sx={{ position: "relative", height: "50px", width: "50px" }}>
      <Typography
        sx={{
          position: "absolute",
          top: 13,
          left: 21,
          fontWeight: 600,
          fontSize: "13px",
        }}
      >
        {cases}
      </Typography>
      <Box sx={{ position: "absolute" }}>
        <IconButton>
          {!type && <WeekendOutlinedIcon fontSize="large" />}
          {type && (
            <WeekendIcon
              color="warning"
              sx={{ opacity: 0.7 }}
              fontSize="large"
            />
          )}
          {/* <Box sx={{ marginTop: "-10px" }}> */}
          {/* </Box> */}
        </IconButton>
      </Box>
    </Box>
  );
};
