import { Box } from '@mui/material'
import SideBar from '../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSocket } from '../utilities/useSocket'

const styles = {
    mainBox: {
        height: '100vh',
        width: '100vw',
        background: "linear-gradient(118.56deg, #E2FFFC 0.21%, #FFF2F1 95.05%)",
        padding: '50px 60px 50px 60px',
        display: 'flex',
        flexDirection: 'row',
        gap: '60px',
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
}


const Home = () => {
    const userId = useSelector(store => store.profile.id)
    const { connectSocket, disconnectSocket } = useSocket(userId)
    useEffect(() => {
        console.log('Trigger Socket')
        connectSocket()

        return () => {
            disconnectSocket()
        }
    }, [connectSocket, disconnectSocket])
    return (
        <Box sx={styles.mainBox}>
            <SideBar />
            <Outlet />
        </Box>
    )
}

export default Home