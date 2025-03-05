from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

import os

env = os.getenv('FLASK_ENV', 'development')

if env == 'production':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://gold_db_do1m_user:MkXMrIWKXrQ27IWpHdPrNpS6cvekd6lw@dpg-cv48hogfnakc73cbhp8g-a/gold_db_do1m'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:4905@localhost:5432/gol_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
from views import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
