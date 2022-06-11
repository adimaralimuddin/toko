import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import MainLayout from "../components/main/MainLayout";
import store from "../redux/store";
import "../styles/globals.css";
import { theme } from "../theme";

import dbConnect from "../utils/connectMongoose";
dbConnect();

function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
