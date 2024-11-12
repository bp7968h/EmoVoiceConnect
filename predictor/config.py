import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')

DATASET_DIR = '../fdataset'

EMOTION_MAPPING = {
    '02': 'calm',
    '03': 'happy',
    '04': 'sad',
    '05': 'angry'
}