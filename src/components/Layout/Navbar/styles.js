import { styled } from "@mui/material/styles";
import { Button, AppBar, Box, Toolbar } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.grey[500],
}));
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  paddingBlock: theme.spacing(2),
  flexWrap: "wrap",
  "&.MuiToolbar-root": {
    paddingInline: theme.spacing(4),
  },
}));
export const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
}));
export const Label = styled("label")(({ theme, hide }) => ({
  color: theme.palette.secondary.main,
  fontWeight: theme.typography.h6.fontWeight,
  marginBlockEnd: theme.spacing(1),
  visibility: hide === "true" ? "hidden" : "visible",
}));
export const Input = styled("input")(({ theme, hide }) => ({
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(1.5),
  border: "1px solid",
  borderColor: theme.palette.grey[400],
  outline: "none",
  width: 200,
  visibility: hide === "true" ? "hidden" : "visible",
  [theme.breakpoints.down("md")]: {
    marginInlineEnd: theme.spacing(2),
  },
}));
export const StyledButton = styled(Button)(({ theme, hide }) => ({
  alignSelf: "flex-end",
  fontSize: theme.typography.subtitle2.fontSize,
  paddingBlock: theme.spacing(1),
  marginInlineStart: theme.spacing(2),
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  visibility: hide === "true" ? "hidden" : "visible",
  [theme.breakpoints.down("md")]: {
    marginBlockStart: 16,
    marginInlineStart: 0,
    marginInlineEnd: theme.spacing(2),
  },
}));

export const FileInputStyle = styled("input")(({ theme }) => ({
  zIndex: 1,
  opacity: 0,
  position: "absolute",
  left: theme.spacing(2.5),
  top: 0,
  height: 40,
  width: 90,
}));
