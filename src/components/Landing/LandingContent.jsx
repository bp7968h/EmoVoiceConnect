import { Box } from '@mui/material'
import Slogan from "./Slogan"
import LandingButton from './LandingButton'
import LandingImage from "./LandingImage"

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        jsutifySelf: 'center'
    },
    sloganContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'space-around'
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    }
}

const LandingContent = () => {
    return (
        <Box sx={styles.main}>
            <Box sx={styles.sloganContainer}>
                <Slogan />
                <LandingButton />
            </Box>
            <Box sx={styles.imageContainer}>
                <LandingImage />
            </Box>
        </Box>
    )
}

export default LandingContent