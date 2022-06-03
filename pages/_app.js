import { UserProvider } from '@auth0/nextjs-auth0'
// import { ThemeProvider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import MainLayout from '../components/main/MainLayout'
import store from '../redux/store'
import '../styles/globals.css'
import { theme } from '../theme'


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
  )
}

export default MyApp
