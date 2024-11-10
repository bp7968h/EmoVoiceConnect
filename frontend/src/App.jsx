import { createTheme, ThemeProvider } from '@mui/material/styles'
import LandingPage from './pages/LandingPage'
import LandingContent from './components/Landing/LandingContent'
import ErrorPage from './pages/ErrorPage'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import ResetPassForm from './pages/ResetPassForm'
import ProtectedRoute from './pages/ProtectedRoute'
import Home from './pages/Home'
import MatchArea from './components/MatchArea/MatchArea'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdateVoiceMemo from './components/Settings/UpdateVoiceMemo'
import LogoutConfirm from './components/Settings/LogoutConfirm'
import EditProfile from './components/Settings/EditProfile'
import Chat from './components/ChatArea/Chat'
import DisplayAlert from './utilities/Alert'
import { Provider } from 'react-redux'
import store from './store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C4B0',
      light: '#FF6F61',
      contrastText: '#495057',
    },
    secondary: {
      main: '#ADB5BD',
    },
    error: {
      main: '#FF6F61'
    }

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
  },
  {
    path: '/home',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          { path: '', element: <MatchArea /> },
          { path: 'editprofile', element: <EditProfile /> },
          { path: 'updatevoicememo', element: <UpdateVoiceMemo /> },
          { path: 'logout', element: <LogoutConfirm /> },
          { path: 'chat', element: <Chat /> }
        ]
      }
    ]
  }

])

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store} >
        <RouterProvider router={router} />
        <DisplayAlert />
      </Provider>
    </ThemeProvider >
  )
}

export default App