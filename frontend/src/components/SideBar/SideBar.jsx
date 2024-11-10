import { Box } from '@mui/material'
import Profile from './Profile'
import Matches from './Matches'
import ProfileSettings from './ProfileSettings'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import { useDispatch } from 'react-redux'
import { getProfileDetails } from '../../reducers/profileSlice'

const SideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showSettings, setShowSettings] = useState(false)

    const handleSettings = () => {
        setShowSettings(!showSettings)
        if (showSettings) {
            navigate('/home')
        }
    }

    useEffect(() => {
        console.log('Fetching Profile Details')
        dispatch(getProfileDetails())
    }, [dispatch])

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