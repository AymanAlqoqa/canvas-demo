import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StylesASide = styled("aside")(({ theme }) => ({
  width: 300,
  paddingBlockStart: theme.spacing(4),
  paddingInline: theme.spacing(4),
  backgroundColor: theme.palette.grey[100],
  borderInlineStart: "1px solid",
  borderInlineStartColor: theme.palette.grey[500],
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderInlineEnd: "1px solid",
    borderInlineEndColor: theme.palette.grey[500],
    borderBlock: "1px solid",
    borderBlockColor: theme.palette.grey[500],
  },
}));
export const StylesShape = styled(Box)(({ theme, circle }) => ({
  width: circle === "true" ? 100 : "100%",
  height: circle === "true" ? 100 : 50,
  border: "1px solid",
  borderColor: theme.palette.grey[400],
  paddingBlock: theme.spacing(1),
  paddingInline: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  color: theme.palette.secondary.main,
  borderRadius: circle === "true" ? "50%" : 0,
  justifyContent: circle === "true" ? "center" : "flex-start",
  marginBlockEnd: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    width: circle === "true" ? 100 : 200,
  },
}));
