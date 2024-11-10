import Logo from './Logo'
import Options from './Options'
import { Box } from '@mui/material'

const styles = {
    main: {
        width: 'auto',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const Header = () => {
    return (
        <Box sx={styles.main}>
            <Logo />
            <Options />
        </Box>
    )
}

export default Header