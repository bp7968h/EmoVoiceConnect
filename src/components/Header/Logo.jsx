import { Box } from '@mui/material'
import DisplayLogo from '../../assets/Logo.png'

const Logo = () => {
    return (
        <Box
            component="img"
            alt="EmoVoiceConnect Logo"
            src={DisplayLogo}
        />
    )
}

export default Logo