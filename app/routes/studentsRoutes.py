from flask import Blueprint, render_template

students = Blueprint('students', __name__, static_folder="static", template_folder="templates")

from app.models.studentsModel import Students

students_model = Students()

@students.route('/')
def show_students():
    students = students_model.get_students()
    return render_template('student.html', students=students)

# Add more routes related to students here if needed
