import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
  },
}));
