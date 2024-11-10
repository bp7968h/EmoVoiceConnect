import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase, Button, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { CircularProgress } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css'
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, fetchInitialMessage } from '../../reducers/chatSlice'

const Chat = () => {
    const userId = useSelector(store => store.profile.id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const { messages, socket, isLoading } = useSelector(store => store.chat);

    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (event) => {
        event.preventDefault()
        if (inputMessage.trim()) {
            const messageData = { sender: userId, receiver: state.id, message: inputMessage }
            socket.emit('send_message', messageData)
            dispatch(sendMessage(messageData))
            setInputMessage('');
        }
    };

    const handleChatClose = () => {
        navigate('/home')
    }

    useEffect(() => {
        dispatch(fetchInitialMessage(state.id))
    }, [dispatch, state])

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar className="appBar" position="static" sx={{ color: 'white', borderRadius: '24px 24px 0px 0px' }}>
                <Toolbar>
                    <Typography variant="h3" sx={{ flexGrow: 1 }}>
                        {state.name}
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="close chat" onClick={handleChatClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List className="chatSection" sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper', borderRadius: '0px 0px 24px 24px' }}>
                {isLoading ? (
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CircularProgress />
                    </Box>
                ) : messages.map((message, index) => (
                    <ListItem key={index} sx={{
                        // justifyContent: message.from === 'me' ? 'flex-end' : 'flex-start',
                        justifyContent: message.sender === userId ? 'flex-end' : 'flex-start',
                    }}>
                        <ListItemText
                            // primary={message.text}
                            primary={message.message}
                            sx={{
                                // background: message.from === 'me' ? '#00C4B0' : '#f5f5f5',
                                background: message.sender === userId ? '#00C4B0' : '#f5f5f5',
                                borderRadius: message.sender === userId ? '24px 24px 0px 24px' : '24px 24px 24px 0px',
                                // borderRadius: message.from === 'me' ? '24px 24px 0px 24px' : '24px 24px 24px 0px',
                                padding: '10px',
                                maxWidth: 'fit-content',
                                display: 'inline-flex'
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Paper className="typingBar" component="form" sx={{ display: 'flex', alignItems: 'center', p: '2px 4px', mx: 1, mt: 1, borderRadius: '100px' }}>
                <InputBase
                    color="secondary"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'type a message' }}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage(e)
                        }
                    }}
                />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="send" onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="send" onClick={handleSendMessage}>
                    <KeyboardVoiceIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default Chat;
