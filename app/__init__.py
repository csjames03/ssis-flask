from flask import Flask, redirect, url_for
from flask_mysql_connector import MySQL
from dotenv import load_dotenv

app = Flask(__name__)
import os

load_dotenv()
app.config["MYSQL_HOST"] = os.getenv("DB_HOST")
app.config["MYSQL_USER"] = os.getenv("DB_USER")
app.config["MYSQL_PASSWORD"] = os.getenv("DB_PASSWORD")
app.config["MYSQL_DATABASE"] = os.getenv("DB_DATABASE")
app.config["MYSQL_CURSORCLASS"] = os.getenv("DB_CURSOR")
mysql = MySQL(app)


# Register your blueprints
from app.routes.student import students
from app.routes.college import colleges
from app.routes.course import courses

app.register_blueprint(students, url_prefix="/students")
app.register_blueprint(courses, url_prefix="/courses")
app.register_blueprint(colleges, url_prefix="/colleges")


@app.route("/")
def index():
    return redirect("/students")


if __name__ == "__main__":
    app.run(debug=True)
