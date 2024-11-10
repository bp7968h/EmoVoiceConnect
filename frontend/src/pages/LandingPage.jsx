import { Box } from '@mui/material'
import Header from "../components/Header/Header"
import { Outlet } from 'react-router-dom'

const styles = {
    mainBox: {
        height: '100vh',
        width: '100vw',
        background: "linear-gradient(118.56deg, #E2FFFC 0.21%, #FFF2F1 95.05%)",
        padding: '50px 100px 50px 100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
}

const LandingPage = () => {
    return (
        <Box sx={styles.mainBox}>
            <Header />
            <Outlet />
        </Box>
    )
}

export default LandingPage