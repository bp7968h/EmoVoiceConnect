import { Box, Typography, Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const styles = {
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: 'black',
        marginLeft: '7px',
        textTransform: 'none',
        width: 'fit-content',
        padding: '6px 20px',
        borderColor: 'black',
        fontFamily: 'Exo'
    }
}

const Options = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        if (location.pathname === '/login') {
            navigate('/register')
        } else {
            navigate('/login')
        }
    }

    return (
        <Box sx={styles.main}>
            <Typography variant="h6">{location.pathname === '/login' ? 'Do not have an account?' : 'Already have and account'}</Typography>
            <Button variant="outlined" sx={styles.button} onClick={handleClick}><p><b>{location.pathname === '/login' ? 'Register' : 'Login'}</b></p></Button>
        </Box >
    )
}

export default Options