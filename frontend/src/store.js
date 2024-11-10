import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './reducers/alertSlice'
import profileReducer from './reducers/profileSlice'
import matchReducer from './reducers/matchSlice'
import chatReducer from './reducers/chatSlice'

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        profile: profileReducer,
        match: matchReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store