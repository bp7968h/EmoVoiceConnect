import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customAxios from "../customAxios"
import config from '../config'
import { showAlert } from './alertSlice'

const initialState = {
    id: '',
    name: '',
    picSrc: '',
    audioSrc: '',
    emotion: '',
    isLoading: false,
    editLoading: false,
}

export const getProfileDetails = createAsyncThunk('profile/getProfileDetails', async (_, thunkAPI) => {
    try {
        const response = await customAxios.get('/api/user')
        console.log('Response getProfileDetails: ', response)
        return response.data
    } catch (error) {
        console.log('Error getProfileDetails: ', error)
        return thunkAPI.rejectWithValue(error)
    }
})

export const editProfileDetails = createAsyncThunk('profile/editProfileDetails', async (newProfileDetails, thunkAPI) => {
    try {
        console.log('Hereeee: ', newProfileDetails)
        const response = await customAxios.put('/api/user/profile', newProfileDetails, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Response editProfileDetails: ', response)
        thunkAPI.dispatch(showAlert({ message: response.data.message, type: 'success' }))
        return response.data
    } catch (error) {
        console.log('Error editProfileDetails: ', error)
        thunkAPI.dispatch(showAlert({ message: error.response.data.message || error.resonse.statusText, type: 'error' }))
        return thunkAPI.rejectWithValue(error)
    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProfileDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.name = action.payload.name
                state.picSrc = `${config.BASE_URL}/${action.payload.picture.split('/emovoiceconnect/')[1]}`
                state.audioSrc = `${config.BASE_URL}/${action.payload.audio.split('/emovoiceconnect/')[1]}`
                state.emotion = action.payload.emotion
                state.id = action.payload.id
            })
            .addCase(getProfileDetails.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(editProfileDetails.pending, (state) => {
                state.editLoading = true
            })
            .addCase(editProfileDetails.fulfilled, (state, action) => {
                state.editLoading = false
                if (action.payload.name) {
                    state.name = action.payload.name
                }
                if (action.payload.picture) {
                    state.picSrc = `${config.BASE_URL}/${action.payload.picture.split('/emovoiceconnect/')[1]}`
                }
                if (action.payload.audio && action.payload.emotion) {
                    state.audioSrc = `${config.BASE_URL}/${action.payload.audio.split('/emovoiceconnect/')[1]}`
                    state.emotion = action.payload.emotion
                }
            })
            .addCase(editProfileDetails.rejected, (state) => {
                state.editLoading = false
            })
    }
})

export default profileSlice.reducer