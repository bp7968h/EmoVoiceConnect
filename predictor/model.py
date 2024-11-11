import os
import librosa
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix

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


# dataset_dir = '../dataset'
dataset_dir = '../fdataset'
metadata = []

for filename in os.listdir(dataset_dir):
    if filename.endswith('.wav'):
        file_info = parse_filename(filename)
        metadata.append(file_info)

def extract_features(file_path):
    # Load audio file
    audio, sample_rate = librosa.load(file_path, sr=None)
    # Extract MFCCs
    mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
    return mfccs

for item in metadata:
    file_path = os.path.join(dataset_dir, item['filename'])
    mfccs = extract_features(file_path)
    item['features'] = mfccs.mean(axis=1)

X = np.array([item['features'] for item in metadata])
y = np.array([item['emotion'] for item in metadata])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

param_grid = {
    'C': [0.1, 1, 10, 100, 1000],
    'gamma': ['scale', 'auto', 0.001, 0.0001],
    'kernel': ['rbf', 'poly', 'sigmoid']
}
grid = GridSearchCV(SVC(), param_grid, refit=True, verbose=2, cv=5)
grid.fit(X_train_scaled, y_train)

scores = cross_val_score(grid, X_train_scaled, y_train, cv=5)
print("Cross-Validation Accuracy Scores:", scores)

# Save the trained model and scaler
joblib.dump(grid.best_estimator_, 'model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Prediction and Evaluation
predictions = grid.best_estimator_.predict(X_test_scaled)
print("Best Parameters:", grid.best_params_)
print(f"Classification Report:\n{classification_report(y_test, predictions)}")
print(f"Confusion Matrix:\n{confusion_matrix(y_test, predictions)}")

