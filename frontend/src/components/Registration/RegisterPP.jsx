import { useState } from 'react'
import {
    Box,
    Typography,
    IconButton,
    Paper
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const RegisterPP = ({ picture, seePicture, handlePictureChange }) => {
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
                Upload Your Profile Picture
            </Typography>
            <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                Make your EmoVoiceConnect profile uniquely yours by adding a profile picture. Show your
                emotions and interests to the community!
            </Typography>
            <Paper
                elevation={!picture ? 0 : 2}
                sx={{
                    width: '150px',
                    height: '180px',
                    border: '1px dashed #00C4B0',
                    borderRadius: '24px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {!picture && (
                    <IconButton
                        color="primary"
                        component="label"
                        sx={{
                            border: 'none',
                            background: 'transparent',
                        }}
                    >
                        <AddIcon fontSize="large" />
                        <input
                            type="file"
                            hidden
                            onChange={handlePictureChange}
                            accept="image/*"
                        />
                    </IconButton>
                )}
                {picture && (
                    <img
                        src={seePicture}
                        alt="Uploaded"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Paper>
            <Typography color={!picture ? '#ADB5BD' : 'primary'} variant="h6">{!picture ? 'Upload Picture' : 'Picture Uploaded'}</Typography>
        </Box>
    )
}

export default RegisterPP