import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BackRoute from "../components/BackRoute";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";
import { LOGINURL, SIGNUPURL } from "../constants/url";
import { postQueryFn } from "../query/postQueryFn";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
export default function SignupPage() {
  const [info, setInfo] = useState({ account: "", pwd: "", userName: "" });
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    mutate: signMutate,
  } = useMutation(["signup"], postQueryFn);
  const handleClick = () => {
    signMutate({
      url: SIGNUPURL,
      data: {
        email: info.account,
        userName: info.userName,
        password: info.pwd,
      },
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const locationInfo = location.state;
  useEffect(() => {
    console.log(locationInfo);
  }, []);
  const gotologin = () => {
    navigate("/login", {
      state: locationInfo,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      // console.log(data.data);
      if (data.data.code === 0) {
        enqueueSnackbar("注册成功，请登录", { variant: "success" });
        gotologin();
      } else {
        enqueueSnackbar(data.data.message, { variant: "error" });
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("注册失败", { variant: "error" });
      return;
    }
  }, [isError]);
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: 1,
        }}
      >
        <BackRoute />
      </Box>
      <Box sx={{ marginTop: 10 }}>
        <Typography variant="h6">注册</Typography>
        <Box sx={{ marginTop: 3 }}>
          <TextField
            label="邮箱"
            sx={{ width: "75%" }}
            value={info.account}
            onChange={(e) => {
              setInfo({
                ...info,
                account: e.target.value,
              });
            }}
          ></TextField>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="用户名"
            sx={{ width: "75%" }}
            value={info.userName}
            onChange={(e) => {
              setInfo({
                ...info,
                userName: e.target.value,
              });
            }}
          ></TextField>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="密码"
            type="password"
            value={info.pwd}
            onChange={(e) => {
              setInfo({
                ...info,
                pwd: e.target.value,
              });
            }}
            sx={{ width: "75%" }}
          ></TextField>
        </Box>
        <LoadingButton
          onClick={handleClick}
          loading={isLoading}
          // loadingPosition="end"

          variant="contained"
          loadingIndicator="注册中…"
          sx={{ width: "65%", marginTop: 6 }}
        >
          <span>注册</span>
        </LoadingButton>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 3,
          display: "flex",
          width: "100%",
          flexDirection: "column",
          maxWidth: 400,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          onClick={() => {
            navigate("/login", { state: location.state });
          }}
        >
          <AccountCircleOutlinedIcon
            sx={{ color: "#ccc", width: 50, height: 50 }}
            fontSize="inherit"
          />
        </IconButton>
        <Typography sx={{ color: "#686363" }}>去登录</Typography>
      </Box>
    </Box>
  );
}
