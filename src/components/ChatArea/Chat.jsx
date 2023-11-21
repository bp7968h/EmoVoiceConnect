import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase, Button, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Chat = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([
        { from: 'them', text: 'Hi Phul Kumar!' },
        { from: 'me', text: 'Hey Phul Kumari! Sup 👋' }
        // Add more messages here
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (event) => {
        event.preventDefault()
        // Add the message to the messages list and clear input
        if (inputMessage.trim()) {
            setMessages([...messages, { from: 'me', text: inputMessage }]);
            setInputMessage('');
        }
    };

    const handleChatClose = () => {
        navigate('/home')
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar className="appBar" position="static" sx={{ color: 'white', borderRadius: '24px 24px 0px 0px' }}>
                <Toolbar>
                    <Typography variant="h3" sx={{ flexGrow: 1 }}>
                        Phul Kumar
                    </Typography>
                    <IconButton edge="end" color="inherit" aria-label="close chat" onClick={handleChatClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List className="chatSection" sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper', borderRadius: '0px 0px 24px 24px' }}>
                {messages.map((message, index) => (
                    <ListItem key={index} alignItems="flex-end" sx={{
                        justifyContent: message.from === 'me' ? 'flex-end' : 'flex-start',
                    }}>
                        <ListItemText
                            primary={message.text}
                            sx={{
                                background: message.from === 'me' ? '#00C4B0' : '#f5f5f5',
                                borderRadius: message.from === 'me' ? '24px 24px 0px 24px' : '24px 24px 24px 0px',
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
