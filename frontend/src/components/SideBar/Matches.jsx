import { Box, Typography, Avatar } from '@mui/material'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMatchedUsers } from '../../reducers/matchSlice'

const Matches = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const matches = useSelector(store => store.match.matches)

    useEffect(() => {
        dispatch(getMatchedUsers())
    }, [dispatch])

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
                {/* {navigate('thepath', { state: {} })} */}
                {matches.map(match => {
                    return <Box key={match.id} onClick={() => navigate('chat', { state: { id: match.id, name: match.name } })} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <Avatar
                            alt={match.name}
                            src={match.imgSrc}
                        // sx={{ width: 46, height: 46 }}
                        />
                        <Box>
                            <Typography variant="h6" >{match.name}</Typography>
                            <Typography variant="body2" color="secondary" >Click Here to Chat</Typography>
                        </Box>
                    </Box>
                })}
            </Box>
        </Box>
    )
}

export default Matches
