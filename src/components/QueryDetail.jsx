import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Icon,
  IconButton,
  InputBase,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { grey } from "@mui/material/colors";
// import area from "../assets/area.json";
import moment from "moment/moment";
import stations from "../assets/stationDetail.json";
// import aWs from "../assets/areaWithStation.json";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled, alpha } from "@mui/material/styles";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const lowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "w",
  "x",
  "y",
  "z",
];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "95%",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
}));
const Puller = styled(Box)(({ theme }) => ({
  width: 50,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 25px)",
}));

export default function QueryDetail(props) {
  const { value: type } = props;
  // useEffect(() => {
  //   console.log(aWs);
  //   console.log(area);
  // }, []);
  const [student, setStudent] = useState(false);
  const [changeStation, setChangeStation] = useState(0); // 0: no change, 1: from, 2: to
  const [GDonly, setGDonly] = React.useState(false);
  const [start, setStart] = useState({ name: "北京南", code: "3" });
  const [end, setEnd] = useState({ name: "济南东", code: "84" });
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const submit = () => {
    if (toDate == null) {
      enqueueSnackbar("请选择出发日期", { variant: "error" });
      return;
    }
    console.log(start.code, end.code, toDate.toString());
    let info = {
      from: start,
      to: end,
      date: moment(toDate.toString()).format("YYYY-MM-DD"),
      onlyGD: GDonly,
    };

    navigate("/querytickets", { state: info });
    // console.log(info);
  };
  return (
    <div>
      <List>
        <ListItem>
          <Box
            sx={{
              height: "40px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "40%",
                cursor: "pointer",
              }}
              onClick={() => {
                setChangeStation(1);
              }}
            >
              {start.name}
            </Box>
            <Tooltip
              onClick={() => {
                let tmp = start;
                setStart(end);
                setEnd(tmp);
              }}
              title="交换"
              placement="bottom"
            >
              <IconButton>
                <ChangeCircleIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                width: "40%",
                justifyContent: "flex-end",
                flexDirection: "row",
                cursor: "pointer",
              }}
              onClick={() => {
                setChangeStation(2);
              }}
            >
              {end.name}
            </Box>
          </Box>
        </ListItem>
        <Divider />
        <ListItem>
          <Box
            sx={{
              height: "40px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* {date.getMonth() + 1 + "月" + date.getDate() + "日"} */}
            <MobileDatePicker
              slotProps={{
                textField: {
                  variant: "standard",
                  label: "出发日期",
                  size: "small",
                  sx: { width: "160px" },
                },
              }}
              closeOnSelect
              format="YYYY-MM-DD"
              onChange={(date) => {
                setToDate(date);
                // console.log(moment(date.toString()).format("YYYY-MM-DD"));
              }}
              disablePast
            ></MobileDatePicker>
          </Box>
        </ListItem>
        <Divider />

        <ListItem>
          <Box
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              label="只看高铁动车"
              control={
                <Checkbox
                  checked={GDonly}
                  onChange={() => setGDonly(!GDonly)}
                />
              }
            />
          </Box>
          <Divider />
        </ListItem>
        <Button
          onClick={submit}
          sx={{ margin: 3, width: "300px" }}
          variant="contained"
        >
          查询
        </Button>
      </List>
      <Drawer
        onClose={() => setChangeStation(0)}
        anchor="bottom"
        open={changeStation > 0}
      >
        <Puller />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="h6">
            {changeStation === 1
              ? "出发城市"
              : changeStation === 2
              ? "到达城市"
              : " "}
          </Typography>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <CityForCase
            setChangeStation={setChangeStation}
            setCity={changeStation === 1 ? setStart : setEnd}
          />
        </Box>
      </Drawer>
    </div>
  );
}
const CityForCase = (props) => {
  const [searchHandle, setSearchHandle] = useState("");
  const { setCity, setChangeStation } = props;
  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          onChange={(event) => {
            setSearchHandle(event.target.value);
          }}
        />
      </Search>
      {lowercase.map((cases) => (
        <Box>
          {(searchHandle == null || searchHandle.length == 0) && (
            <Typography variant="h6" sx={{ marginLeft: 1, marginTop: 2 }}>
              {cases.toUpperCase()}
            </Typography>
          )}
          <Box>
            {stations.map((st) => {
              // console.log(st.areaName.startsWith)
              return (
                st.name.startsWith(searchHandle) &&
                st.abbr.startsWith(cases) && (
                  <Box>
                    <Box
                      sx={{
                        height: 50,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 2,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCity({
                          name: st.name,
                          code: st.code,
                        });
                        setChangeStation(0);
                      }}
                    >
                      {st.name}
                    </Box>
                    <Divider />
                  </Box>
                )
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
