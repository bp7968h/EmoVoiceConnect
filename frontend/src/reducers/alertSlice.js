import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    type: "info",
    message: "",
    timeout: 5000
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            return {
                ...initialState,
                ...action.payload,
                open: true
            }
        },
        closeAlert: (state) => {
            return {
                ...state,
                open: false
            }
        }
    }
})

export default alertSlice.reducer
export const { showAlert, closeAlert } = alertSlice.actions
