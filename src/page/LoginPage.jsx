import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BackRoute from "../components/BackRoute";
import { useMutation } from "react-query";
import { LoadingButton } from "@mui/lab";
import { LOGINURL } from "../constants/url";
import { postQueryFn } from "../query/postQueryFn";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
export default function LoginPage() {
  const [info, setInfo] = useState({ account: "", pwd: "" });
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    mutate: signMutate,
  } = useMutation(["login"], postQueryFn);
  const handleClick = () => {
    signMutate({
      url: LOGINURL,
      data: {
        email: info.account,
        password: info.pwd,
      },
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const locationInfo = location.state;
  useEffect(() => {
    if (isSuccess) {
      // console.log(data.data);
      if (data.data.code === 0) {
        localStorage.setItem("token", data.data.data.token);
        localStorage.setItem("userId", data.data.data.id);
        localStorage.setItem("idCode", data.data.data.idCode);
        localStorage.setItem("name", data.data.data.userName);
        enqueueSnackbar("登录成功", { variant: "success" });
        navigate(locationInfo?.url || "/", {
          state: { data: locationInfo?.data },
        });
      } else {
        enqueueSnackbar(data.data.message, { variant: "error" });
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("登录失败", { variant: "error" });
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
        <Typography variant="h6">登录</Typography>
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
          loadingIndicator="登录中…"
          sx={{ width: "65%", marginTop: 6 }}
        >
          <span>登录</span>
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
            navigate("/signup", { state: location.state });
          }}
        >
          <AddCircleOutlineOutlinedIcon
            sx={{ color: "#ccc", width: 50, height: 50 }}
            fontSize="inherit"
          />
        </IconButton>
        <Typography sx={{ color: "#686363" }}>去注册</Typography>
      </Box>
    </Box>
  );
}
