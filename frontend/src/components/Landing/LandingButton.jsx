import { Box, Button } from '@mui/material'
import './styles.css'
import { useNavigate } from 'react-router-dom'

const styles = {
    button: {
        color: '#fff',
        height: '60px',
        width: '426px',
        textTransform: 'none'
    }
}

const LandingButton = () => {
    const navigate = useNavigate()

    const handleCreateAccClick = () => {
        navigate('/register')
    }

    return (
        <Box className="buttonSlideIn" sx={{ alignSelf: 'center' }}>
            <Button variant="contained" sx={styles.button} onClick={handleCreateAccClick}><h4><b>Create Account Now</b></h4></Button>
        </Box>
    )
}

export default LandingButton