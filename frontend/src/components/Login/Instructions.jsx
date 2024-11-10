import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'

const Instructions = ({ instruction }) => {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <IconButton
                color="primary"
                onClick={handleBackClick}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography component="h3" color="#6C757D" variant="h5" sx={{ mt: 1, mb: 2, mr: 'auto', ml: 'auto' }}>
                {instruction}
            </Typography>
        </Box>
    )
}

export default Instructions
