import { CardActions, Card, CardMedia, CardContent, Typography, Fab, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TestImage from '../../assets/pic.jpg'
import VoiceMemo from '../../assets/sad.wav'

const PotentialMatches = () => {

    const userImageUrl = '../../assets/my3.jpeg';
    return (
        <Card className="SlideInFromRight" sx={{
            height: '576px',
            borderRadius: '100px',
            display: 'flex',
            padding: '40px'
            // maxWidth: '833px',
            // ml: 'auto'
            // alignSelf: 'center'
        }}>
            <CardMedia
                component="img"
                alt="Some User"
                image={TestImage}
                sx={{
                    maxWidth: '469px',
                    maxheight: '469px',
                    borderRadius: '100px 12px 100px 12px'
                }}
            />
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                // gap: '60px',
                paddingLeft: '20px',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <CardContent sx={{ marginRight: 'auto' }}>
                    <Typography gutterBottom variant="h3" component="div">
                        Phul Kumar
                    </Typography>
                </CardContent>
                <audio controls style={{ width: '100%', alignSelf: 'center', color: '#00C4B0', }}>
                    <source src={VoiceMemo} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
                <CardActions sx={{ mb: 5, gap: 3 }}>
                    <Fab aria-label="add">
                        <CheckIcon color="primary" sx={{ height: '35px', width: '35px' }} />
                    </Fab>
                    <Fab sx={{ borderRadius: '16px', height: '60px', width: '60px' }} aria-label="add">
                        <FavoriteIcon sx={{ color: 'pink', height: '40px', width: '40px' }} />
                    </Fab>
                    <Fab aria-label="add">
                        <CloseIcon sx={{ color: "#FF6F61", height: '35px', width: '35px' }} />
                    </Fab>
                </CardActions>
            </Box>
        </Card >
    )
}

export default PotentialMatches