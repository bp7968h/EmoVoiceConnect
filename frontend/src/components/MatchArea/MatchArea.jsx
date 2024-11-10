import { Box } from '@mui/material'
import AreaHeader from './AreaHeader'
import PotentialMatches from './PotentialMatches'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPotentialMatches } from '../../reducers/matchSlice'

const MatchArea = () => {
    const dispatch = useDispatch()
    const userEmotion = useSelector(store => store.profile.emotion)
    useEffect(() => {
        console.log('Emotion', userEmotion)
        dispatch(getPotentialMatches(userEmotion))
    }, [dispatch, userEmotion])
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            // alignItems: 'center',
            // ml: 'auto',
            // mr: 'auto',
            gap: '25px'
            // justifyContent: 'space-around'
        }}>
            <AreaHeader />
            <PotentialMatches />
        </Box>
    )
}

export default MatchArea