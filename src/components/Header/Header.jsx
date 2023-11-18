import Logo from './Logo'
import Options from './Options'
import { Box } from '@mui/material'
import './styles.css'


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
        <Box sx={styles.main} className="headerSlideIn">
            <Logo />
            <Options />
        </Box>
    )
}

export default Header