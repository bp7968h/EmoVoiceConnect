from flask import Flask, request, jsonify
import librosa
import joblib
import os
import requests
import jwt

app = Flask(__name__)
SECRET_KEY ='123abc123abc123abc123abc'

emotion_mapping = {'02': 'calm', '03': 'happy', 
                   '04': 'sad', '05': 'angry'}
# Load the trained model and scaler
model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

def extract_features(file_path):
    audio, sample_rate = librosa.load(file_path, sr=None)
    mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
    return mfccs

def verify_token(token):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return True
    except Exception as e:
        print(f"Token verification failed: {e}")
        return False

def download_file(file_url, save_path, token):
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(file_url, headers=headers, stream=True)
    
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Success: File downloaded, {save_path}")
        return save_path
    else:
        print(f"Error: Unable to download file, status code {response.status_code}")
        return None

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
        print("Not downloaded")
        return jsonify({'error': 'Failed to download file'}), 500

    print("Downloaded")
    try:
        print("1")
        mfccs = extract_features(temp_file)
        print("2")
        features = mfccs.mean(axis=1).reshape(1, -1)
        print("3")
        features_scaled = scaler.transform(features)
        print("4")
        prediction = model.predict(features_scaled)
        print("5")
        emotion = emotion_mapping.get(str(prediction[0]), 'unknown')
        print("6")
        # os.remove(temp_file)
        return jsonify({'emotion': emotion})
    except Exception as e:
        print("Got at the end error")
        if os.path.exists(temp_file):
            os.remove(temp_file)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
