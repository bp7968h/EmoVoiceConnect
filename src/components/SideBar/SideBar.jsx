import { Box } from '@mui/material'
import Profile from './Profile'
import Matches from './Matches'
import ProfileSettings from './ProfileSettings'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const SideBar = () => {
    const navigate = useNavigate()
    const [showSettings, setShowSettings] = useState(false)
    const handleSettings = () => {
        setShowSettings(!showSettings)
        if (showSettings) {
            navigate('/home')
        }
    }

    return (
        <Box sx={{
            width: '427px',
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            borderRight: '2px solid #DEE2E6'


        }}>
            <Profile ToggleSettings={handleSettings} />
            {!showSettings ? <Matches /> : <ProfileSettings />}
        </Box >
    )
}

export default SideBar