import { Box, Avatar, Typography, IconButton } from '@mui/material'
import ListIcon from '@mui/icons-material/List';
import { useSelector } from 'react-redux';
import './styles.css'
import { CircularProgress } from '@mui/material'


const Profile = ({ ToggleSettings }) => {
    const { name, picSrc, isLoading } = useSelector(store => store.profile)
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px'
        }} className="SlideInFromLeft" >
            {isLoading ? <CircularProgress sx={{ ml: 'auto', mr: 'auto' }} /> :
                <>
                    <Avatar
                        alt="User Profile PIcture"
                        src={picSrc}
                        sx={{ width: 56, height: 56 }}
                    />
                    <Typography variant="h5" color="primary.contrastText">{name}</Typography>
                    <IconButton sx={{ ml: 'auto', mr: 3 }} onClick={ToggleSettings}>
                        <ListIcon />
                    </IconButton>
                </>}
        </Box>
    )
}

export default Profile