import { Box, Typography } from '@mui/material'
import './styles.css'

const Slogan = () => {
    return (
        <Box className="sloganSlideIn" sx={{ width: '688px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h2">Where Emotions and Interests Unite</Typography>
            <Typography variant="subtitle1" sx={{ color: '#6C757D' }}>
                Welcome to EmoVoiceConnect, the social media platform that bridges the gap between
                emotions and shared interests. Experience a new way of connecting with people from all walks
                of life.
            </Typography>
        </Box>
    )
}

export default Slogan