import { Box, TextField, Grid, Button, FormControlLabel, Checkbox, Link } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import authenticateUser from '../../services/login';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../reducers/alertSlice'

const Form = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await authenticateUser({ email, password })
            if (response) {
                dispatch(showAlert({ message: response.message, type: 'success' }))
                setEmail('')
                setPassword('')
                window.localStorage.setItem('token', JSON.stringify(response.token))
                navigate('/home')
            }
        } catch (error) {
            console.log('Error Here: ', error)
            const message = error.response ? error.response.data.message : error.message
            dispatch(showAlert({ message: message, type: 'error' }))
            setEmail('')
            setPassword('')
        }
    };

    return (
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
            <br />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                sx={{ width: '426px' }}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember Me"
                    />
                </Grid>
                <Grid item xs>
                    <Link component={RouterLink} to="/resetpsw" variant="h6" color="primary">
                        Forgot password?
                    </Link>
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={email === '' || password === '' ? true : false}
                sx={{ mt: 3, mb: 2, textTransform: 'none', height: '60px', width: '426px' }}
            >
                <h4><b>Login</b></h4>
            </Button>
        </Box>
    )
}

export default Form