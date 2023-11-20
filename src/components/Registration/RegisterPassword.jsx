import {
    Typography,
    Box,
    TextField,
    Button
} from '@mui/material'

const RegisterPassword = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <Typography variant="h2" sx={{ mb: 1 }}>
                Create Your Account Password
            </Typography>
            <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                Remember, a strong password helps keep your EmoVoiceConnect account safe and your
                conversations private. Your security is our priority.
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // value={password}
                sx={{ width: '426px' }}
            // onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // value={password}
                sx={{ width: '426px' }}
            // onChange={(e) => setPassword(e.target.value)}
            />
        </Box>
    )
}

export default RegisterPassword