import SmallLogo from '../../assets/favicon.png'
import { Box, Typography, Button, TextField, Avatar } from '@mui/material'
import ProfilePicture from '../../assets/pic.jpg'
import { useRef } from 'react'
import './styles.css'
const EditProfile = () => {
    const fileInputRef = useRef(null)

    const handleEditProfile = () => {
        console.log('Update Profile Details')
    }

    const handleChangePP = () => {
        fileInputRef.current.click()
    }

    const handlePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            console.log('File', file)
        }
    }

    return (
        <Box sx={{
            width: '1100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box className="SlideInFromTop" sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
            }}>
                <Box
                    component="img"
                    src={SmallLogo}
                />
                <Typography variant="h3">Edit Profile</Typography>
            </Box>
            <Box className="SlideInFromBottom" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 15,
                gap: 3
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Avatar
                        alt="Profile Picture"
                        src={ProfilePicture}
                        sx={{ width: 210, height: 210 }}
                    />
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={handlePictureChange}
                        accept='image/*'
                    />
                    <Typography variant="body1" color="error" sx={{ alignSelf: 'center' }} onClick={handleChangePP}>
                        Change Profile Picture
                    </Typography>
                </Box>
                <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Current Name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    sx={{ width: '426px' }}
                />
                <Button
                    onClick={handleEditProfile}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, textTransform: 'none', height: '60px', width: '426px' }}
                >
                    <h4><b>Update</b></h4>
                </Button>
            </Box>
        </Box>
    )
}

export default EditProfile