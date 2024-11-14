# EmoVoiceConnect 🎙❤️

EmoVoiceConnect is an innovative web-based matchmaking platform that goes beyond traditional dating apps by leveraging AI-powered emotion detection from voice recordings. The platform fosters deeper, meaningful connections by matching users based on their emotional states, rather than superficial traits.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [License](#license)

## Introduction {#introduction}
In a world where social interactions are increasingly moving online, EmoVoiceConnect aims to make connections more authentic by prioritizing emotional compatibility. Using machine learning algorithms, the platform analyzes users' voice recordings to detect emotional states (happiness, sadness, calmness, or anger) and matches users based on complementary emotions.

## Features {#features}
- **Emotion-based Matchmaking**: Match users based on emotional compatibility derived from voice recordings.
- **Real-time Chat**: Engage with matched users through an integrated chat system.
- **Profile Management**: Create and customize profiles with voice samples.
- **Secure User Authentication**: Secure login and registration with JWT-based authentication.
- **Data Privacy**: All voice recordings and pictures are securely stored and processed with user consent.

## Technologies Used {#technologies-used}
### Frontend
- **React**: For building dynamic user interfaces.
- **Material-UI**: For a UI components.

### Backend
- **Node.js**: Backend runtime environment.
- **Express**: For building RESTful APIs.
- **MongoDB**: NoSQL database for scalable data storage.

### AI/ML
- **Python (Flask)**: For the AI microservice handling voice emotion analysis.
- **Librosa**: For audio processing and feature extraction.
- **TensorFlow**: For training deep learning models on emotion detection.

## Installation {#installation}
To get started with EmoVoiceConnect locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Python 3 with `pip`

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/bp7968h/EmoVoiceConnect.git
cd EmoVoiceConnect

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.sample .env
# Update .env with your MongoDB URI and other secrets

# Run the backend server
npm run start
```

### Frontend Setup
```bash
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.sample .env
# Update .env with your your backend URL

# Run the React app
npm start
```

### Predictor - AI Microservice Setup
```bash
# Navigate to the AI service folder
cd ../predictor

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # For Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python main.py
```

## Usage {#usage}

- Register a new account.
- Complete your profile and upload a voice sample.
- Browse through matches based on emotional compatibility.
- Engage in conversations with your matches through the chat feature.

## Contributions {#contributions}

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License {#license}

Please view the [License File](LICENSE)