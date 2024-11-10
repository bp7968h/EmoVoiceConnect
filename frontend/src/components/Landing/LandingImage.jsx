import HeroImage from '../../assets/HeroImage.png'
import { Box } from '@mui/material'
import './styles.css'

const LandingImage = () => {
    return (
        <Box
            className="imgSlideIn"
            component="img"
            alt="Landing Page Image which shows Connection"
            src={HeroImage}
            style={{
                maxWidth: '450px',
                maxHeight: '630px',
                objectFit: 'contain' // or 'cover' based on your requirement 
            }}
        />
    )
}

export default LandingImage