from flask import Flask, redirect, url_for
from flask_mysql_connector import MySQL
from dotenv import load_dotenv
app = Flask(__name__)
import os
load_dotenv()

app.config['MYSQL_HOST'] = os.getenv('HOST')
app.config['MYSQL_USER'] = os.getenv('USER')
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DATABASE'] = os.getenv('DATABASE')

mysql = MySQL(app)

app.config['MYSQL_CURSORCLASS'] =   os.getenv('CURSOR')
 

# Register your blueprints
from app.routes.studentsRoutes import students
from app.routes.collegesRoutes import colleges
from app.routes.coursesRoutes import courses

app.register_blueprint(students, url_prefix='/students')
app.register_blueprint(courses,  url_prefix='/courses')
app.register_blueprint(colleges, url_prefix='/colleges')

@app.route('/')
def index():
    return redirect('/students')

if __name__ == '__main__':
    app.run(debug=True)
