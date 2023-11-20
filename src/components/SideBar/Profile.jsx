import { Box, Avatar, Typography, IconButton } from '@mui/material'
import ListIcon from '@mui/icons-material/List';
import './styles.css'

const Profile = ({ ToggleSettings }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px'
        }} className="SlideInFromLeft" >
            <Avatar
                alt="User Profile PIcture"
                src="../../assets/my.jpeg"
                sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h5" color="primary.contrastText">Bhuwan Pandit</Typography>
            <IconButton sx={{ ml: 'auto', mr: 3 }} onClick={ToggleSettings}>
                <ListIcon />
            </IconButton>
        </Box>
    )
}

export default Profile