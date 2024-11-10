import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customAxios from "../customAxios"
import config from '../config'
import { showAlert } from './alertSlice'

const initialState = {
    isLoading: false,
    matches: [],
    potentialMatches: []
}

export const getMatchedUsers = createAsyncThunk('match/getMatchedUsers', async (_, thunkAPI) => {
    try {
        const response = await customAxios.get('/api/match')
        console.log('Response getMatchedUsers: ', response)
        return response.data
    } catch (error) {
        console.log('Error getMatchedUsers: ', error)
        return thunkAPI.rejectWithValue(error)
    }
})

export const getPotentialMatches = createAsyncThunk('match/getPotentialMatches', async (emotion, thunkAPI) => {
    try {
        console.log('Paylod : ', emotion)
        const response = await customAxios.get(`/api/match/users?emotion=${emotion}`)
        console.log('Response getPotentialMatches: ', response)
        return response.data
    } catch (error) {
        console.log('Error getPotentialMatches: ', error)
        return thunkAPI.rejectWithValue(error)
    }
})

export const likePotentialMatches = createAsyncThunk('match/likePotentialMatches', async (likedUser, thunkAPI) => {
    try {
        const response = await customAxios.post(`/api/match/like`, { likedUserId: likedUser })
        console.log('Response likePotentialMatches: ', response)
        if (response.data.match) {
            return response.data.match
        } else {
            return response.data.likedUser
        }
    } catch (error) {
        console.log('Error likePotentialMatch: ', error)
        return thunkAPI.rejectWithValue(error)
    }
})

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        dislikeUser: (state, action) => {
            const dislikedUserId = action.payload;
            state.potentialMatches = state.potentialMatches.filter(user => user.id !== dislikedUserId)
        },
        newMatch: (state, action) => {
            const newMatchedUser = {
                id: action.payload.id,
                name: action.payload.name,
                imgSrc: `${config.BASE_URL}/${action.payload.imgSrc.split('/emovoiceconnect/')[1]}`
            }
            state.matches.push(newMatchedUser)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPotentialMatches.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPotentialMatches.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getPotentialMatches.fulfilled, (state, action) => {
                console.log('Fulfilled Payload: ', action.payload)
                state.isLoading = false
                if (action.payload) {
                    state.potentialMatches = action.payload.map(user => {
                        return {
                            voiceSrc: `${config.BASE_URL}/${user.audio.split('/emovoiceconnect/')[1]}`,
                            imgSrc: `${config.BASE_URL}/${user.picture.split('/emovoiceconnect/')[1]}`,
                            name: user.name,
                            id: user.id,
                        }
                    })
                }
            })
            .addCase(likePotentialMatches.fulfilled, (state, action) => {
                state.potentialMatches = state.potentialMatches.filter(user => user.id !== action.payload)
            })
            .addCase(getMatchedUsers.fulfilled, (state, action) => {
                state.matches = action.payload.map(match => {
                    return {
                        id: match.id,
                        name: match.name,
                        imgSrc: `${config.BASE_URL}/${match.picture.split('/emovoiceconnect/')[1]}`
                    }
                })
            })
    }
})


export const { dislikeUser, newMatch } = matchSlice.actions
export default matchSlice.reducer