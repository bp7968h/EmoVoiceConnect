import SmallLogo from '../../assets/favicon.png'
import { Stack, Box, Typography, IconButton, Button } from '@mui/material'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState } from 'react'
import './styles.css'


const UpdateVoiceMemo = () => {
    const [audio, setAudio] = useState(null);
    const [audioSrc, setAudioSrc] = useState('');

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const audioURL = URL.createObjectURL(file);
            setAudio(file);
            setAudioSrc(audioURL);
        }
    };

    const handleVoiceUpdate = () => {
        console.log('Update Clicked')
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box className="SlideInFromTop" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
            }}>
                <Box
                    component="img"
                    src={SmallLogo}
                />
                <Typography variant="h3">Update Voice Memos</Typography>
            </Box>
            <Stack
                sx={{ mt: 4 }}
                spacing={8}
                className="SlideInFromBottom"
            >
                <Typography variant="body1" color="#ADB5BD">
                    Remeber, if you update your Voice Memo, your old Voice Memo will be removed and the new one will
                    be available for you and other users.
                </Typography>
                <Box
                    sx={{
                        alignSelf: 'center',
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
                                accept="audio/*"
                                onChange={handleAudioChange}
                            />
                        </IconButton>
                    ) : (
                        <audio src={audioSrc} controls style={{ width: '100%' }}>
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </Box>
                <Typography color={!audio ? '#ADB5BD' : 'primary'} variant="h6" sx={{ alignSelf: 'center' }}>
                    {!audio ? 'Upload Voice Memo' : 'Listen to your Memo'}
                </Typography>
                <Button
                    onClick={handleVoiceUpdate}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 2, textTransform: 'none', height: '60px', width: '426px', alignSelf: 'center' }}
                >
                    <h4><b>Update</b></h4>
                </Button>
            </Stack>
        </Box>
    )
}

export default UpdateVoiceMemo