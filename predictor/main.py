if __name__ == '__main__':
    import sys
    import os
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))

    from api import app
    app.run(host='0.0.0.0', port=5000, debug=True)