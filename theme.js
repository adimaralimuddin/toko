import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6363",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: {
    h6: {
      color: "#FF4949",
    },
    body2: {
      color: "#757575",
    },
    body1: {
      color: "#757575",
    },
  },
});
