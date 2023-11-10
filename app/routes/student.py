from flask import Blueprint, render_template, request, jsonify
from app.models.student import Students
from app.models.course import Courses

students = Blueprint(
    "students", __name__, static_folder="static", template_folder="templates"
)

students_model = Students()
courses_model = Courses()


@students.route("/")
def show_students():
    students = students_model.get_students()
    courses = courses_model.get_courses()
    return render_template("student.html", students=students, courses=courses)


@students.route("/add", methods=["POST"])
def add_students():
    req = request.json
    student_id = req["student_id"]
    first_name = req["first_name"]
    last_name = req["last_name"]
    gender = req["gender"]
    year_level = req["year_level"]
    course_code = req["course_code"]
    print(student_id, first_name, last_name, gender, year_level, course_code)
    create_student = students_model.add_student(
        student_id, first_name, last_name, gender, year_level, course_code
    )
    message = create_student[0]
    status_code = create_student[1]

    return message, status_code
