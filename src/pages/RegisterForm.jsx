import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterHeader from '../components/Registration/RegisterHeader'
import RegisterEmail from '../components/Registration/RegisterEmail'
import RegisterPassword from '../components/Registration/RegisterPassword'
import RegisterInfo from '../components/Registration/RegisterInfo'
import RegisterPP from '../components/Registration/RegisterPP'
import RegisterVoice from '../components/Registration/RegisterVoice'
import { Container, Button } from '@mui/material'

const RegisterForm = () => {
    const navigate = useNavigate()

    const [currentStep, setCurrentStep] = useState(1)
    const nextStep = () => setCurrentStep(currentStep + 1)
    const previousStep = () => setCurrentStep(currentStep - 1)
    const BackPage = () => navigate(-1)

    const handleRegister = () => {
        console.log('Finish')
    }

    const getStepComponent = (step) => {
        switch (step) {
            case 1:
                return <RegisterEmail />
            case 2:
                return <RegisterPassword />
            case 3:
                return <RegisterInfo />
            case 4:
                return <RegisterPP />
            case 5:
                return <RegisterVoice />
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

    return (
        <Container component="main"
            sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                // alignItems: 'center'
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
                sx={{ mt: 4, mb: 2, textTransform: 'none', height: '60px', width: '426px', alignSelf: 'center' }}
            >
                <h4><b>{currentStep === 5 ? 'Register Account' : 'Next'}</b></h4>
            </Button>
        </Container>
    )


}

export default RegisterForm