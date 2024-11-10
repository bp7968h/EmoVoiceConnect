import SmallLogo from '../../assets/favicon.png'
import { Box, Typography, Button } from '@mui/material'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../reducers/alertSlice'

const LogoutConfirm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = () => {
        window.localStorage.removeItem("token")
        dispatch(showAlert({ message: 'Logged Out Successfully', type: 'success' }))
        navigate('/')
    }

    return (
        <Box sx={{
            width: '1100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '50px',
            justifyContent: 'center'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
            }}>
                <Box
                    component="img"
                    src={SmallLogo}
                />
                <Typography variant="h3">Log Out</Typography>
            </Box>
            <Typography variant="h5" sx={{ mt: 25 }}>
                Are you sure you want to logout from your account
            </Typography>
            <Button
                className="SlideInFromRight"
                onClick={handleLogOut}
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 4, mb: 2, textTransform: 'none', height: '60px', width: '226px', justifySelf: 'center', marginBottom: 'auto' }}
            >
                <h4><b>Log Out</b></h4>
            </Button>
        </Box>
    )
}

export default LogoutConfirm