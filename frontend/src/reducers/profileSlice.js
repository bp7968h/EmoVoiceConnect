import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customAxios from "../customAxios"
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
        const profileData = response.data

        if (profileData.picture) {
            const picResponse = await customAxios.get(`/api/${profileData.picture}`, { responseType: 'blob' });
            profileData.picture = URL.createObjectURL(picResponse.data);
        }
        
        if (profileData.audio) {
            const audioResponse = await customAxios.get(`/api/${profileData.audio}`, { responseType: 'blob' });
            profileData.audio = URL.createObjectURL(audioResponse.data);
        }

        return profileData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const editProfileDetails = createAsyncThunk('profile/editProfileDetails', async (newProfileDetails, thunkAPI) => {
    try {
        const response = await customAxios.put('/api/user/profile', newProfileDetails, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        thunkAPI.dispatch(showAlert({ message: response.data.message, type: 'success' }))

        const picFile = newProfileDetails.get('picture');
        const audioFile = newProfileDetails.get('audio');

        return {
            ...response.data,
            audio: audioFile ? URL.createObjectURL(audioFile) : undefined,
            picture: picFile ? URL.createObjectURL(picFile) : undefined,
        };
    } catch (error) {
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
                state.picSrc = action.payload.picture
                state.audioSrc = action.payload.audio
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
                    state.picSrc = action.payload.picture
                }
                if (action.payload.audio && action.payload.emotion) {
                    state.audioSrc = action.payload.audio
                    state.emotion = action.payload.emotion
                }
            })
            .addCase(editProfileDetails.rejected, (state) => {
                state.editLoading = false
            })
    }
})

export default profileSlice.reducer