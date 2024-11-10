import Instructions from '../components/Login/Instructions'
import { useState } from 'react'
import {
    TextField,
    Button,
    Link,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ResetPassForm = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('reset clicked')
    }

    return (
        <Container component="main" sx={{ mt: 2 }}>
            <Instructions instruction="Forgot your password?" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h2" sx={{ mb: 1 }}>
                    No worries! We'll help you reset it.
                </Typography>
                <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                    Please enter your email address assiociated with your EmoVoiceConnect account,
                    and we'll send you instructions on how to reset your password.
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        sx={{ width: '426px' }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Typography variant="h6" color="#ADB5BD">
                        Did not receive an email?
                        <Link component={RouterLink} to="/resetpsw" variant="h6" color="primary">
                            Send Again
                        </Link>
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, textTransform: 'none', height: '60px', width: '426px' }}
                    >
                        <h4><b>Reset Password</b></h4>
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ResetPassForm