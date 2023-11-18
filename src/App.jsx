import { createTheme, ThemeProvider } from '@mui/material/styles'
import LandingPage from './pages/LandingPage'
import LandingContent from './components/Landing/LandingContent'
import ErrorPage from './pages/ErrorPage'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import ResetPassForm from './pages/ResetPassForm'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C4B0',
    },
    secondary: {
      main: '#ADB5BD',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif',
    h1: {
      fontFamily: 'Exo, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Exo, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Exo, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Exo, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Exo, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Exo, Arial, sans-serif',
    },
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingContent /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: 'resetpsw', element: <ResetPassForm /> },
    ]
  }
])

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider >
  )
}

export default App