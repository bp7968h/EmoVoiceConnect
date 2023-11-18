import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const primary = '#2196f3'

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleBackHome = () => {
        navigate('/')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: 'linear-gradient(118.56deg, #E2FFFC 0.21%, #FFF2F1 95.05%)',
            }}
        >
            <Typography variant="h1" style={{ color: 'black' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'black' }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <IconButton size='large' aria-label="go back to home" onClick={handleBackHome}>
                <HomeIcon sx={{ color: '#00C4B0' }} />
            </IconButton>
        </Box>
    );
}

export default ErrorPage