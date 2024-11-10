import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlert } from '../reducers/alertSlice';

const DisplayAlert = () => {
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeAlert())
    }
    const alert = useSelector((store) => store.alert)

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={alert.timeout}
            onClose={handleClose}
        >
            <Alert
                severity={alert.type}
                sx={{ width: '100%' }}
                onClose={handleClose}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    )
}

export default DisplayAlert
