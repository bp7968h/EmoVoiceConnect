import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const RegisterVoice = ({ audio, audioSrc, handleAudioChange }) => {

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
                Ready to make your voice heard
            </Typography>
            <Typography variant="body1" color="#ADB5BD" sx={{ mb: 1 }}>
                Upload your thoughts, emotions, and stories in your own voice. Simply click on the microphone
                icon to upload your existing voice memos.
            </Typography>
            <Box
                sx={{
                    width: '150px',
                    height: '180px',
                    border: !audio ? '1px dashed #00C4B0' : 'none',
                    borderRadius: '24px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {!audio ? (
                    <IconButton
                        color="primary"
                        component="label"
                        sx={{
                            border: 'none',
                            background: 'transparent',
                        }}
                    >
                        <KeyboardVoiceIcon fontSize="large" />
                        <input
                            type="file"
                            hidden
                            accept="audio/wav"
                            onChange={handleAudioChange}
                        />
                    </IconButton>
                ) : (
                    <audio src={audioSrc} controls style={{ width: '100%' }}>
                        Your browser does not support the audio element.
                    </audio>
                )}
            </Box>
            <Typography color={!audio ? '#ADB5BD' : 'primary'} variant="h6">
                {!audio ? 'Upload Voice Memo' : 'Listen to your Memo'}
            </Typography>
        </Box>
    );
};

export default RegisterVoice;
