const getOppositeEmotion = (emotion) => {
    switch (emotion) {
        case 'happy':
            return 'sad'
        case 'sad':
            return 'happy'
        case 'angry':
            return 'calm'
        case 'calm':
            return 'angry'
        default:
            return 'happy'
    }
}

module.exports = getOppositeEmotion