import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const Puller = styled(Box)(({ theme }) => ({
  width: 50,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 25px)",
}));
