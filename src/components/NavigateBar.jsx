import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DirectionsSubwayFilledIcon from "@mui/icons-material/DirectionsSubwayFilled";
import { Navigate, useNavigate } from "react-router-dom";
export default function NavigateBar(props) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Paper elevation={5} style={{ width: "100%", maxWidth: "400px" }}>
        <BottomNavigation
          onChange={(event, newValue) => {
            switch (newValue) {
              case 1:
                navigate("/");
                break;
              case 2:
                navigate("/order");
                break;
              case 3:
                navigate("/profile");
                break;
              default:
                break;
            }
          }}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
          value={props.value}
          showLabels
        >
          <BottomNavigationAction
            label="查询"
            value={1}
            icon={<DirectionsSubwayFilledIcon />}
          />
          <BottomNavigationAction
            label="订单"
            value={2}
            icon={<ReceiptLongIcon />}
          />
          <BottomNavigationAction
            value={3}
            label="我的"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
