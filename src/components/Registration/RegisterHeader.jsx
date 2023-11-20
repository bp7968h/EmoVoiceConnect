import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const RegisterHeader = ({ instruction, previousStep }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <IconButton
                color="primary"
                onClick={previousStep}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography component="h3" color="#6C757D" variant="h5" sx={{ mt: 1, mb: 2, mr: 'auto', ml: 'auto' }}>
                {instruction}
            </Typography>
        </Box>
    )
}

export default RegisterHeader