import joblib
import librosa
import numpy as np
from config import EMOTION_MAPPING

# Load the trained model and scaler
def load_model_and_scaler():
    model = joblib.load('model.pkl')
    scaler = joblib.load('scaler.pkl')
    return model, scaler

def parse_filename(filename):
    parts = filename.split('-')
    return {
        'filename': filename,
        'modality': parts[0],
        'vocal_channel': parts[1],
        'emotion': parts[2],
        'intensity': parts[3],
        'statement': parts[4],
        'repetition': parts[5],
        'actor': parts[6].split('.')[0]
    }

def extract_features(file_path):
    try:
        print(f"Loading audio file: {file_path}")
        audio, sample_rate = librosa.load(file_path, sr=None)

        if audio.size == 0:
            raise ValueError("Audio file is empty or corrupted")

        # Extract MFCCs
        mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
        return mfccs.mean(axis=1).reshape(1, -1)
    except Exception as e:
        print(f"Error during feature extraction: {e}")
        raise

def make_prediction(features):
    model, scaler = load_model_and_scaler()
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)
    return EMOTION_MAPPING.get(str(prediction[0]), 'unknown')