import { useDispatch } from 'react-redux'
import { initSocket, closeSocket, receiveMessage } from '../reducers/chatSlice'
import { newMatch } from '../reducers/matchSlice'
import { showAlert } from '../reducers/alertSlice'
import io from 'socket.io-client'
import { useCallback } from 'react'
import config from '../config'

export const useSocket = (userId) => {
    const dispatch = useDispatch()

    const connectSocket = useCallback(() => {
        const socket = io(config.BASE_URL, { query: { userId } })
        dispatch(initSocket(socket))

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('receive_message', (message) => {
            console.log('Message Received From Socket: ', message)
            dispatch(receiveMessage(message))
        })

        socket.on('match', (matchedUser) => {
            console.log('Match Received: ', matchedUser)
            dispatch(newMatch(matchedUser))
            dispatch(showAlert({ message: 'You Got a New Match', type: 'warning' }))
        })

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });
    }, [userId, dispatch])

    const disconnectSocket = useCallback(() => {
        dispatch(closeSocket())
    }, [dispatch])

    return { connectSocket, disconnectSocket }
}