from flask import Flask, request, jsonify
from utils import download_file, verify_token
from model import extract_features, make_prediction
from config import SECRET_KEY, EMOTION_MAPPING
import os

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authorization header missing'}), 401
    
    token = token.replace('Bearer ', '')
    if not verify_token(token):
        return jsonify({'error': 'Invalid token'}), 401

    data = request.json
    file_url = data.get('file_url')
    
    if not file_url:
        return jsonify({'error': 'File URL or token not provided'}), 400
    
    temp_file = 'temp_audio.wav'
    downloaded_file = download_file(file_url, temp_file, token)

    if not downloaded_file:
        return jsonify({'error': 'Failed to download file'}), 500

    try:
        features = extract_features(temp_file)
        emotion = make_prediction(features)
        os.remove(temp_file)
        return jsonify({'emotion': emotion})
    except Exception as e:
        if os.path.exists(temp_file):
            os.remove(temp_file)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
