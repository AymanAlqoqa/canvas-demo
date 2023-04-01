import { styled } from "@mui/material/styles";

export const StyledMain = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  width: "calc(100% - 300px)",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "50vh",
  },
}));
