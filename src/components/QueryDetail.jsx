import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Icon,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
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
  const [student, setStudent] = useState(false);
  const [changeStation, setChangeStation] = useState(0); // 0: no change, 1: from, 2: to
  const [GDonly, setGDonly] = React.useState(false);
  const [start, setStart] = useState({ name: "北京", code: "0357" });
  const [end, setEnd] = useState({ name: "济南", code: "0602" });
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
            09月02日
          </Box>
          <Box flex={1}></Box>
          {type === 1 && (
            <Box
              sx={{
                height: "40px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              09月02日
            </Box>
          )}
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
        <Button sx={{ margin: 3, width: "300px" }} variant="contained">
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
        <Box sx={{ width: "100px", marginTop: 2 }}></Box>
      </Drawer>
    </div>
  );
}
