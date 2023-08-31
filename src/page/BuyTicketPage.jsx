import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import TrainsCard from "../components/TrainsCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Puller } from "../components/Puller";
import { useMutation } from "react-query";
import { postQueryFn } from "../query/postQueryFn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  BUYTICKETURL,
  GETFELLOWERURL,
  GETORDERSURL,
  REFUNDTICKETURL,
} from "../constants/url";
import SelectSeat from "../components/SelectSeat";
import { useSnackbar } from "notistack";
import Loading from "../components/Loading";
import { LoadingButton } from "@mui/lab";
export const OrderInfoContext = React.createContext();

export default function BuyTicketPage() {
  const localtion = useLocation();
  const info = localtion.state.data;
  const [openDrwer, setOpenDrwer] = useState(false);
  const [selfellower, setSelfellower] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    trainNo: info.trainNo,
    fromStationCode: info.fromStationCode,
    toStationCode: info.toStationCode,
    seatType: null,
    date: info.date,
    fellowers: [],
  });

  const {
    isLoading: orderLoading,
    isSuccess: orderSuccess,
    data: orders,
    isError: orderIsError,
    error: orderErroError,
    mutate: orderMutate,
  } = useMutation(["getorders"], postQueryFn);

  useEffect(() => {
    if (orderSuccess) {
      // console.log(orders);
      document.write(orders.data.message);
    }
  }, [orderSuccess]);
  const navigate = useNavigate();
  const {
    isLoading: fellowLoading,
    isSuccess: fellowSuccess,
    data: fellowers,
    isError: fellowIsError,
    error: fellowErroError,
    mutate: fellowMutate,
  } = useMutation(["getfellow"], postQueryFn);
  const updFellow = () => {
    fellowMutate({
      url: GETFELLOWERURL,
      method: "get",
      useToken: true,
    });
  };
  useEffect(() => {
    updFellow();
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const submitTicket = () => {
    if (orderInfo.seatType === null) {
      enqueueSnackbar("请选择座位类型", {
        variant: "error",
      });
      return;
    }
    if (selfellower.filter((item) => item.checked === true).length === 0) {
      enqueueSnackbar("请添加同行人", {
        variant: "error",
      });
      return;
    }
    let payload = {
      ...orderInfo,
      fellowers: selfellower
        .filter((item) => item.checked == true)
        .map((item) => ({
          idCode: item.idCode,
          userName: item.userName,
          seatPos: item.seatPos,
        })),
    };
    console.log(payload);
    orderMutate({
      url: BUYTICKETURL,
      method: "post",
      useToken: true,
      data: payload,
    });
  };
  useEffect(() => {
    if (fellowSuccess) {
      console.log(fellowers);
      setSelfellower(
        fellowers?.data?.data.map((item) => {
          return { ...item, checked: false, seatPos: -1 };
        })
      );
    }
  }, [fellowSuccess]);
  // useEffect(() => {
  //   console.log(orderInfo);
  // }, [orderInfo]);
  return (
    <Box sx={{ overflowY: "auto" }}>
      <OrderInfoContext.Provider value={{ orderInfo, setOrderInfo }}>
        <Topbar>
          <Typography>确认订单</Typography>
        </Topbar>
        <Box sx={{ marginTop: 10 }}>
          <TrainsCard data={info} flag={1} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Paper sx={{ marginTop: 1, width: "95%" }} elevation={3}>
            {selfellower.map((item, index) => {
              if (item.checked) {
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
                        onClick={() => {
                          setSelfellower(
                            selfellower.map((item2, index2) => {
                              if (index2 === index) {
                                return { ...item2, checked: false };
                              } else {
                                return item2;
                              }
                            })
                          );
                        }}
                        sx={{ marginRight: 1 }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Box>

                    <Divider />
                  </Box>
                );
              }
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
                setOpenDrwer(true);
              }}
            >
              <AddCircleOutlineIcon fontSize="medium" color="warning" />
              <Box sx={{ width: "10px" }}></Box>
              <Typography color="#ed6c02">添加同行人</Typography>
            </Box>
          </Paper>
          {info?.trainClassName === "高速" && (
            <Paper sx={{ marginTop: 3, width: "95%" }} elevation={3}>
              {selfellower.map((item, index) => {
                if (item.checked) {
                  return (
                    <SelectSeat
                      value={item.seatPos}
                      type={orderInfo.seatType}
                      click={(e) => {
                        setSelfellower(
                          selfellower.map((item2, index2) => {
                            if (index2 === index) {
                              return { ...item2, seatPos: e };
                            } else {
                              return item2;
                            }
                          })
                        );
                      }}
                    />
                  );
                }
              })}
            </Paper>
          )}
        </Box>
        <LoadingButton
          loadingIndicator="下单中…"
          loading={orderLoading}
          variant="contained"
          onClick={submitTicket}
          sx={{ width: "90%", marginTop: 3 }}
        >
          确定
        </LoadingButton>
        <Box sx={{ height: "100px" }}></Box>
        <Drawer
          onClose={() => {
            setOpenDrwer(false);
          }}
          anchor="bottom"
          open={openDrwer}
        >
          <Puller />

          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Button
              sx={{ marginBottom: 3 }}
              fullWidth
              color="warning"
              variant="outlined"
              onClick={() => {
                navigate("/addFellow");
              }}
            >
              新增同行者
            </Button>
            {fellowLoading && <Loading />}
            {selfellower.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    height: "60px",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      setSelfellower(
                        selfellower.map((item2, index2) => {
                          if (index2 === index) {
                            return { ...item2, checked: !item2.checked };
                          } else {
                            return item2;
                          }
                        })
                      );
                    }}
                  >
                    <Box
                      sx={{
                        width: "20%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox checked={item.checked} />
                    </Box>
                    <Box
                      sx={{
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        display: "flex",
                      }}
                    >
                      <Typography variant="h6">{item.userName}</Typography>
                      <Typography variant="body2">{item.idCode}</Typography>
                    </Box>
                  </ListItemButton>
                </Box>
                <Divider />
              </Box>
            ))}
            <Button
              onClick={() => {
                setOpenDrwer(false);
              }}
              variant="contained"
              sx={{ width: "300px", marginTop: 3 }}
            >
              完成
            </Button>
          </Box>
        </Drawer>
      </OrderInfoContext.Provider>
    </Box>
  );
}
