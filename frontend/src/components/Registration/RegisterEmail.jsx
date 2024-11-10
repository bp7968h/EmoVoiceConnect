import {
    Typography,
    Box,
    TextField,
    Button
} from '@mui/material'
import './styles.css'

const RegisterEmail = ({ email, handleEmailChange }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
            className="FormSlideIn"
        >
            <Typography variant="h2" sx={{ mb: 1 }}>
                Register with EmoVoiceConnect!
            </Typography>
            <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                Unlock the world of emotional connections and shared interests by joining EmoVoiceConnect.
                Create your account today and be part of a community that celebrates meaningful interactions.
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                sx={{ width: '426px' }}
                onChange={handleEmailChange}
            />
        </Box>
    )
}

export default RegisterEmail