import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customAxios from '../customAxios'
import config from '../config'

// { sender: '656217e4047f7e4ee1efa9f8', receiver: '6562185f047f7e4ee1efaa00', message: 'Hi Phul Kumar!' },
// { sender: '6562185f047f7e4ee1efaa00', receiver: '656217e4047f7e4ee1efa9f8', message: 'Hey Phul Kumari! Sup 👋' }

const initialState = {
    socket: null,
    messages: [],
    receiverId: null,
    isLoading: true
}

export const fetchInitialMessage = createAsyncThunk('chat/fetchInitialMessage', async (receiverId, thunkAPI) => {
    try {
        const response = await customAxios.get(`/api/chat/${receiverId}`)
        return response.data
    } catch {
        return thunkAPI.rejectWithValue(error)
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        initSocket: (state, action) => {
            state.socket = action.payload
        },
        closeSocket: (state) => {
            if (state.socket) {
                state.socket.disconnect()
            }
            state.socket = null
        },
        sendMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        receiveMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialMessage.rejected, state => {
                state.isLoading = false
            })
            .addCase(fetchInitialMessage.fulfilled, (state, action) => {
                state.messages = action.payload
                state.isLoading = false

            })
    }
})

export const { initSocket, closeSocket, sendMessage, receiveMessage } = chatSlice.actions
export default chatSlice.reducer