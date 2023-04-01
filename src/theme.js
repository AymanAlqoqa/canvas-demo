import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#f2f2f3",
    },
    secondary: {
      main: "#3b441f",
    },

    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "roboto; san-serif",
  },
});

export default theme;
