import { UserProvider } from "@auth0/nextjs-auth0";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import MainLayout from "../components/main/MainLayout";
import store from "../redux/store";
import "../styles/globals.css";
import { theme } from "../theme";

import dbConnect from "../utils/connectMongoose";
dbConnect();


const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ThemeProvider>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
