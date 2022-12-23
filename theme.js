import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6e53d6",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#17c93e",
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: {
    h6: {
      color: "#3b2462",
    },
    body2: {
      color: "#7a7094",
    },
    body1: {
      color: "#483c59",
    },
  },
});
