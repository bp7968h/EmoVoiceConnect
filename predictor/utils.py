import requests
import jwt
from config import SECRET_KEY

def download_file(file_url, save_path, token):
    headers = { 'Authorization': f'Bearer {token}' }
    response = requests.get(file_url, headers=headers, stream=True)
    
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Success: File downloaded, {save_path}")
        return save_path
    else:
        print(f"Error: Unable to download file, status code {response.status_code}")
        return None

def verify_token(token):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return True
    except Exception as e:
        print(f"Token verification failed: {e}")
        return False