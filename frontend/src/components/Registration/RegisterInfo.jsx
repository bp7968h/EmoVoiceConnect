import {
    Box,
    Typography,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import { useState } from 'react'

const RegisterInfo = ({ name, handleNameChange, gender, handleGenderChange }) => {
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
                value={name}
                sx={{ width: '426px' }}
                onChange={handleNameChange}
            />
            <FormGroup row={true} sx={{ mt: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={gender === 'Male'}
                            onChange={handleGenderChange}
                            name="Male"
                        />
                    }
                    label="Male"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={gender === 'Female'}
                            onChange={handleGenderChange}
                            name="Female"
                        />
                    }
                    label="Female"
                />
            </FormGroup>
        </Box>
    )
}

export default RegisterInfo