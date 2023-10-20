from flask import Blueprint, render_template

courses = Blueprint('courses', __name__, static_folder="static", template_folder="templates")

@courses.route('/')
def show_students():
    return render_template('course.html')

