import os
from flask import Flask

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY'] if 'SECRET_KEY' in os.environ else 'debug'

# Register web routes
from src.Routes.Home import homeBlueprint
app.register_blueprint(homeBlueprint)

# Run application
if __name__ == '__main__':
    app.run(port=8000, threaded=True)