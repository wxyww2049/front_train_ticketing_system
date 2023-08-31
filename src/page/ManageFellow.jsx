import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import { DELETEFELLOW, GETFELLOWERURL } from "../constants/url";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { getToken } from "../api/getToken";
import { enqueueSnackbar } from "notistack";
export default function ManageFellow() {
  const { isLoading, isSuccess, isError, data, mutate } = useMutation(
    ["queryFellow"],
    postQueryFn
  );
  const update = () => {
    mutate({
      url: GETFELLOWERURL,
      method: "GET",
      useToken: true,
    });
  };
  useEffect(() => {
    update();
  }, []);
  const delFellow = (id) => {
    axios
      .request({
        url: DELETEFELLOW,
        method: "POST",
        data: {
          id: id,
        },
        headers: {
          token: getToken(),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        update();
      })
      .catch((err) => {
        enqueueSnackbar("删除失败", { variant: "error" });
      });
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Topbar>
        <Box>
          <Typography>同行人管理</Typography>
        </Box>
      </Topbar>
      <Paper sx={{ marginTop: 3, width: "95%", margin: 10 }} elevation={3}>
        {/* {isLoading && <Loading />} */}
        {isSuccess &&
          data?.data?.data?.map((item, index) => {
            return (
              <Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      alignItems: "flex-start",
                      display: "flex",
                      marginTop: 1,
                      marginBottom: 1,
                      marginLeft: 2,
                    }}
                  >
                    <Typography variant="h6">{item.userName}</Typography>
                    <Typography variant="body2">{item.idCode}</Typography>
                  </Box>
                  <Box flex={1}></Box>
                  <IconButton
                    onClick={() => delFellow(item.id)}
                    sx={{ marginRight: 1 }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>

                <Divider />
              </Box>
            );
          })}
        <Box
          sx={{
            width: "95%",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          // elevation={3}
          onClick={() => {
            navigate("/addFellow");
          }}
        >
          <AddCircleOutlineIcon fontSize="medium" color="warning" />
          <Box sx={{ width: "10px" }}></Box>
          <Typography color="#ed6c02">添加同行人</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
