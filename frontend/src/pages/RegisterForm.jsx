import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterHeader from '../components/Registration/RegisterHeader'
import RegisterEmail from '../components/Registration/RegisterEmail'
import RegisterPassword from '../components/Registration/RegisterPassword'
import RegisterInfo from '../components/Registration/RegisterInfo'
import RegisterPP from '../components/Registration/RegisterPP'
import RegisterVoice from '../components/Registration/RegisterVoice'
import { Container, Button } from '@mui/material'
import RegisterUser from '../services/register'
import { showAlert } from '../reducers/alertSlice'
import { useDispatch } from 'react-redux'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [currentStep, setCurrentStep] = useState(1)
    const nextStep = () => setCurrentStep(currentStep + 1)
    const previousStep = () => setCurrentStep(currentStep - 1)
    const BackPage = () => navigate(-1)



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [picture, setPicture] = useState(null)
    const [seePicture, setSeePicture] = useState(null)
    const [audio, setAudio] = useState(null);
    const [audioSrc, setAudioSrc] = useState('');

    const handleRegister = async () => {
        try {
            const userData = new FormData()
            userData.append('email', email)
            userData.append('password', confirmPassword)
            userData.append('name', name)
            userData.append('gender', gender)
            userData.append('picture', picture)
            userData.append('audio', audio)

            const response = await RegisterUser(userData)
            if (response) {
                dispatch(showAlert({ message: response.message, type: 'success' }))
                // console.log('check: ', response.message)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setName('')
                setGender('')
                setPicture(null)
                setSeePicture(null)
                setAudio(null)
                setAudioSrc('')
                navigate('/login')
            }
        } catch (error) {
            dispatch(showAlert({ message: error.response.data.message, type: 'error' }))
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setName('')
            setGender('')
            setPicture(null)
            setSeePicture(null)
            setAudio(null)
            setAudioSrc('')
            navigate('/')
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.name)
    }

    const handlePictureChange = (e) => {
        const pic = e.target.files[0]
        if (pic) {
            setSeePicture(URL.createObjectURL(pic))
            setPicture(pic)
        }
    }

    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const audioURL = URL.createObjectURL(file);
            setAudio(file);
            setAudioSrc(audioURL);
        }
    };

    const getStepComponent = (step) => {
        switch (step) {
            case 1:
                return <RegisterEmail email={email} handleEmailChange={handleEmailChange} />
            case 2:
                return <RegisterPassword password={password} cpassword={confirmPassword} handlePassword={handlePasswordChange} handleCPassword={handleConfirmPasswordChange} />
            case 3:
                return <RegisterInfo name={name} handleNameChange={handleNameChange} gender={gender} handleGenderChange={handleGenderChange} />
            case 4:
                return <RegisterPP picture={picture} seePicture={seePicture} handlePictureChange={handlePictureChange} />
            case 5:
                return <RegisterVoice audio={audio} audioSrc={audioSrc} handleAudioChange={handleAudioChange} />
            default:
                return <RegisterEmail />
        }
    }

    const instruction = {
        1: "Setup Your Account",
        2: "Setup Your Account",
        3: "About You",
        4: "About You",
        5: "About You"
    }

    const handleDisable = (step) => {
        switch (step) {
            case 1:
                return email === '' ? true : false
            case 2:
                return password !== '' && password === confirmPassword ? false : true
            case 3:
                return name === '' || gender === '' ? true : false
            case 4:
                return picture ? false : true
            case 5:
                return audio ? false : true
            default:
                return email === '' ? true : false
        }
    }

    return (
        <Container component="main"
            sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center'
            }}>
            <RegisterHeader
                instruction={instruction[currentStep]}
                previousStep={currentStep > 1 ? previousStep : BackPage}
            />
            {getStepComponent(currentStep)}
            <Button
                onClick={currentStep === 5 ? handleRegister : nextStep}
                fullWidth
                variant="contained"
                disabled={handleDisable(currentStep)}
                sx={{ mt: 4, mb: 2, textTransform: 'none', height: '60px', width: '426px', alignSelf: 'center' }}
            >
                <h4><b>{currentStep === 5 ? 'Register Account' : 'Next'}</b></h4>
            </Button>
        </Container>
    )


}

export default RegisterForm