import Instructions from '../components/Login/Instructions'
import Form from '../components/Login/Form'
import {
    Box,
    Typography,
    Container,
} from '@mui/material';

const LoginForm = () => {
    return (
        <Container component="main" sx={{ mt: 2 }}>
            <Instructions instruction="Welcome Back 😊" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h2" sx={{ mb: 1 }}>
                    Login to EmoVoiceConnect!
                </Typography>
                <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                    Welcome Back! Please enter your login details to access your EmoVoiceConnect account:
                </Typography>
                <Form />
            </Box>
        </Container>
    );
};

export default LoginForm;
