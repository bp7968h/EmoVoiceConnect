import SmallLogo from '../../assets/favicon.png'
import { Box, Typography, Button, TextField, Avatar } from '@mui/material'
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editProfileDetails } from '../../reducers/profileSlice'

const EditProfile = () => {
    const dispatch = useDispatch()
    const { name, picSrc } = useSelector(store => store.profile)
    const [newName, setNewName] = useState(name)
    const [newPicture, setNewPicture] = useState(null)
    const [tempPic, setTempPic] = useState(null)
    const fileInputRef = useRef(null)

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleChangePP = () => {
        fileInputRef.current.click()
    }

    const handlePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewPicture(file)
            setTempPic(URL.createObjectURL(file))
            // console.log('File', file)
        }
    }

    const handleEditProfile = () => {
        const newDetails = new FormData()
        if (newPicture) {
            // console.log('Set Pic')
            newDetails.append('picture', newPicture)
        }
        if (newName !== name) {
            // console.log('Set Name')
            newDetails.append('newName', newName)
        }
        dispatch(editProfileDetails(newDetails))
        // console.log('Update Fired')
    }

    return (
        <Box sx={{
            width: '1100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 12,
                gap: 3
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    <Avatar
                        alt="Profile Picture"
                        src={tempPic ? tempPic : picSrc}
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
                    value={newName}
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    onChange={handleNameChange}
                    sx={{ width: '426px' }}
                />
                <Button
                    disabled={newName === name && !tempPic ? true : false}
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