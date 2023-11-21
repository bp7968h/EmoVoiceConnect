import { Box, Typography, Avatar } from '@mui/material'
import './styles.css'
import { useNavigate } from 'react-router-dom'

const Matches = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }}>
            <Typography variant="body1" color="#343A40" className="SlideInFromLeft">Your Matches</Typography>
            <Box className="SlideInFromBottom" sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: '25px',
                marginBottom: '12px',
                maxHeight: 'calc(100vh - 240px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none',  // For Internet Explorer 10+
            }}>
                <Box onClick={() => navigate('chat')} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="User Profile PIcture"
                        src="../../assets/my.jpeg"
                    // sx={{ width: 46, height: 46 }}
                    />
                    <Box>
                        <Typography variant="h6" >Bhuwan Pandit</Typography>
                        <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Matches
