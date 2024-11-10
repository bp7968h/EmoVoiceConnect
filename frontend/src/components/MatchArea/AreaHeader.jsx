import { Box } from '@mui/material'
import AreaLogo from '../../assets/Logo.png'
import './styles.css'

const AreaHeader = () => {
    return (
        <Box
            component="img"
            alt="EmoVoiceConnect Logo"
            src={AreaLogo}
            sx={{
                maxHeight: '65px',
                maxWidth: '257px',
                alignSelf: 'center'
            }}
            className="SlideInFromTop"
        />
    )
}

export default AreaHeader