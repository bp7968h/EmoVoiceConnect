import { Update } from '@mui/icons-material'
import { Stack, Typography, Divider } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileSettings = () => {
    const navigate = useNavigate()
    const [isEPActive, setIsEPActive] = useState(false)
    const [isVoiceActive, setIsVoiceActive] = useState(false)
    const [isLogOutActive, setIsLogOutActive] = useState(false)

    const handleEPClick = (e) => {
        if (isVoiceActive) {
            setIsVoiceActive(!isVoiceActive)
        }
        if (isLogOutActive) {
            setIsLogOutActive(!isLogOutActive)
        }
        setIsEPActive(!isEPActive)
        navigate('editprofile')
    }
    const handleVoiceClick = (e) => {
        if (isEPActive) {
            setIsEPActive(!isEPActive)
        }
        if (isLogOutActive) {
            setIsLogOutActive(!isLogOutActive)
        }
        setIsVoiceActive(!isVoiceActive)
        navigate('updatevoicememo')
    }
    const handleLogOut = () => {
        if (isEPActive) {
            setIsEPActive(!isEPActive)
        }
        if (isVoiceActive) {
            setIsVoiceActive(!isVoiceActive)
        }
        setIsLogOutActive(!isLogOutActive)
        navigate('logout')
    }
    return (
        <Stack
            spacing={4}
            divider={<Divider />}
            sx={{
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            className="SlideInFromBottom"
        >
            <Typography variant="h5" color={isEPActive ? '#00C4B0' : ''} onClick={handleEPClick}>Edit Profile</Typography>
            <Typography variant="h5" color={isVoiceActive ? '#00C4B0' : ''} onClick={handleVoiceClick}>Update Voice Prompts</Typography>
            <Typography variant="h5" color={isLogOutActive ? '#00C4B0' : ''} onClick={handleLogOut}>Logout</Typography>
        </Stack>
    )
}

export default ProfileSettings