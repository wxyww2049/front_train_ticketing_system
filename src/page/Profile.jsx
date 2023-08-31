import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
export default function Profile() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login", { state: { url: "/profile" } });
      enqueueSnackbar("请先登录", { variant: "warning" });
    }
  }, []);
  return (
    <Box>
      <Topbar flag={0}>
        <Typography>个人设置</Typography>
      </Topbar>
      <Box
        sx={{
          marginTop: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper sx={{ width: "95%" }}>
          <List sx={{ marginLeft: 1, marginRight: 1 }}>
            <MyListItem text="修改身份证号" url="/changeIdCode" />
            <Divider />
            <MyListItem text="同行人管理" url="/manageFellow" />
            <Divider />
            <MyListItem text="本人车票" url="/tickets" />
            <Divider />
          </List>
        </Paper>
        <Button
          variant="contained"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          sx={{ marginTop: 6, width: "300px" }}
        >
          退出登录
        </Button>
        {/* <Paper sx={{ width: "95%", marginTop: 3 }}>
          <List sx={{ marginLeft: 1, marginRight: 1 }}>
            <MyListItem
              text="退出登录"
              click={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            />
            <Divider />
            <Divider />
          </List>
        </Paper> */}
      </Box>
    </Box>
  );
}
const MyListItem = (props) => {
  const navigate = useNavigate();

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <ChevronRightIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        onClick={props.click ? () => props.click() : () => navigate(props.url)}
      >
        <Typography>{props.text}</Typography>
      </ListItemButton>
    </ListItem>
  );
};
