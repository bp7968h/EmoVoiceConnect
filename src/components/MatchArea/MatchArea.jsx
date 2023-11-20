import { Box } from '@mui/material'
import AreaHeader from './AreaHeader'
import PotentialMatches from './PotentialMatches'

const MatchArea = () => {
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