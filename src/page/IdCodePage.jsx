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
import { ADDFELLOWURL, CHANGEIDCODE } from "../constants/url";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

export default function IdCodePage() {
  const [code, setCode] = useState(localStorage.getItem("idCode"));
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation(
    ["addFellow"],
    postQueryFn
  );
  const submit = () => {
    if (code === "" || code === null) {
      enqueueSnackbar("请输入姓名", { variant: "error" });
      return;
    }
    mutate({
      method: "POST",
      url: CHANGEIDCODE,
      data: {
        idCode: code,
      },
      useToken: true,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.code === 0) {
        enqueueSnackbar("修改成功", { variant: "success" });
        localStorage.setItem("idCode", code);
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
            修改身份证号
          </Typography>
        </Box>
      </Topbar>
      <Paper
        sx={{ marginTop: 10, width: "95%", height: "300px" }}
        elevation={3}
      >
        <Box sx={{ marginTop: 10 }}>
          <TextField
            label="新证件号"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            sx={{ width: "300px" }}
          />
        </Box>

        <LoadingButton
          onClick={submit}
          variant="contained"
          loading={isLoading}
          loadingIndicator="修改中…"
          sx={{ marginTop: 6, width: "300px" }}
        >
          修改
        </LoadingButton>
        <Box sx={{ height: 30 }}></Box>
      </Paper>
    </Box>
  );
}
