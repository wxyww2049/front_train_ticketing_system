import {
  Box,
  Button,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { ADDFELLOWURL } from "../constants/url";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

export default function AddFellow() {
  const [info, setInfo] = useState({ name: "", idCode: "" });
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation(
    ["addFellow"],
    postQueryFn
  );
  const submit = () => {
    if (info.idCode === "" || info.idCode === null) {
      enqueueSnackbar("请输入身份证号", { variant: "error" });
      return;
    }
    if (info.name === "" || info.name === null) {
      enqueueSnackbar("请输入姓名", { variant: "error" });
      return;
    }
    mutate({
      method: "POST",
      url: ADDFELLOWURL,
      data: {
        userName: info.name,
        idCode: info.idCode,
      },
      useToken: true,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.code === 0) {
        enqueueSnackbar("添加成功", { variant: "success" });
        navigate(-1);
      } else {
        enqueueSnackbar(data?.data?.message, { variant: "error" });
      }
    }
  }, [isSuccess]);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Topbar>
        <Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            添加同行人
          </Typography>
        </Box>
      </Topbar>
      <Paper sx={{ marginTop: 3, width: "100%" }} elevation={3}>
        <Box sx={{ marginTop: 15 }}>
          <TextField
            label="姓名"
            value={info.name}
            onChange={(e) => {
              setInfo({ ...info, name: e.target.value });
            }}
            sx={{ width: "300px" }}
          />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <TextField
            label="身份证号"
            sx={{ width: "300px" }}
            value={info.idCode}
            onChange={(e) => setInfo({ ...info, idCode: e.target.value })}
          />
        </Box>
        <LoadingButton
          onClick={submit}
          variant="contained"
          loading={isLoading}
          loadingIndicator="添加中…"
          sx={{ marginTop: 3, width: "300px" }}
        >
          添加
        </LoadingButton>
        <Box sx={{ height: 30 }}></Box>
      </Paper>
    </Box>
  );
}
