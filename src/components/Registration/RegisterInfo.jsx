import {
    Box,
    Typography,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import { useState } from 'react'

const RegisterInfo = () => {
    const [selectedGender, setSelectedGender] = useState('');

    const handleChange = (event) => {
        setSelectedGender(event.target.name);
    };
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
                Your Personal Information
            </Typography>
            <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                Hello, there! We'd love to know you better. Please enter you information below so that we
                can address you by your preferred details.
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                autoFocus
                // value=""
                sx={{ width: '426px' }}
            // onChange={(e) => setEmail(e.target.value)}
            />
            <FormGroup row={true} sx={{ mt: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedGender === 'male'}
                            onChange={handleChange}
                            name="male"
                        />
                    }
                    label="Male"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedGender === 'female'}
                            onChange={handleChange}
                            name="female"
                        />
                    }
                    label="Female"
                />
            </FormGroup>
        </Box>
    )
}

export default RegisterInfo