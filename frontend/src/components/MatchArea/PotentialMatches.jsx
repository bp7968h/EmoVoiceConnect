import { CardActions, Card, CardMedia, CardContent, Typography, Fab, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likePotentialMatches, dislikeUser } from '../../reducers/matchSlice'

import './styles.css'

const PotentialMatches = () => {
    const dispatch = useDispatch()
    const Users = useSelector(store => store.match.potentialMatches)
    console.log('P Users: ', Users)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex >= Users.length) {
            setCurrentIndex(Math.max(0, Users.length - 1));
        }
    }, [Users.length, currentIndex])

    const handleLike = () => {
        const likedUserId = Users[currentIndex]?.id
        if (likedUserId) {
            dispatch(likePotentialMatches(likedUserId))
        }
    }
    const handleDislike = () => {
        const dislikedUserId = Users[currentIndex]?.id
        if (dislikedUserId) {
            dispatch(dislikeUser(dislikedUserId))
        }
    }

    const currentUser = Users[currentIndex]
    if (Users.length === 0 || !currentUser) {
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
    console.log('Curent Index POtential Match: ', currentIndex)
    console.log('Current User POtential Match: ', currentUser)
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
                <audio key={currentUser.id} controls style={{ width: '100%', alignSelf: 'center', color: '#00C4B0', }}>
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