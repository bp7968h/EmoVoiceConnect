import { CardActions, Card, CardMedia, CardContent, Typography, Fab, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import TestImage from '../../assets/pic.jpg'
import TestImage1 from '../../assets/pic2.png'
import VoiceMemo from '../../assets/sad.wav'
import VoiceMemo1 from '../../assets/angry.wav'
import { useState } from 'react'
import './styles.css'

const PotentialMatches = () => {
    const Users = [
        { name: 'Bhuwan Pandit', imgSrc: TestImage, voiceSrc: VoiceMemo },
        { name: 'Phul Kumar', imgSrc: TestImage1, voiceSrc: VoiceMemo1 }
    ]
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleLike = () => {
        setCurrentIndex(currentIndex + 1)
    }
    const handleDislike = () => {
        setCurrentIndex(currentIndex + 1)
    }
    if (currentIndex >= Users.length) {
        return (
            <Box className="SlideInFromBottom" sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <SentimentVeryDissatisfiedIcon color="error" sx={{ width: '210px', height: '210px' }} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" color="secondary">We could not find any potential matches that meets your criteria at the moment.</Typography>
                    <Typography variant="h6" color="secondary">Keep exploring and refining your preferences to discover new connections.</Typography>
                </Box>
            </Box>
        )
    }
    const currentUser = Users[currentIndex]
    return (
        <Card className="SlideInFromRight" sx={{
            height: '576px',
            borderRadius: '100px',
            display: 'flex',
            padding: '40px'
        }}>
            <CardMedia
                component="img"
                alt={currentUser.name}
                image={currentUser.imgSrc}
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
                        {currentUser.name}
                    </Typography>
                </CardContent>
                <audio key={currentIndex} controls style={{ width: '100%', alignSelf: 'center', color: '#00C4B0', }}>
                    <source src={currentUser.voiceSrc} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
                <CardActions sx={{ mb: 5, gap: 3 }}>
                    <Fab aria-label="add" onClick={handleLike}>
                        <CheckIcon color="primary" sx={{ height: '35px', width: '35px' }} />
                    </Fab>
                    <Fab sx={{ borderRadius: '16px', height: '60px', width: '60px' }} aria-label="add">
                        <FavoriteIcon sx={{ color: 'pink', height: '40px', width: '40px' }} />
                    </Fab>
                    <Fab aria-label="add" onClick={handleDislike}>
                        <CloseIcon sx={{ color: "#FF6F61", height: '35px', width: '35px' }} />
                    </Fab>
                </CardActions>
            </Box>
        </Card >
    )
}

export default PotentialMatches