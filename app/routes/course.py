from flask import Blueprint, render_template, request, jsonify
from app.models.course import Courses
from app.models.college import Colleges

courses = Blueprint(
    "courses", __name__, static_folder="static", template_folder="templates"
)

courses_model = Courses()
college_model = Colleges()


@courses.route("/", methods=["GET", "POST"])
def show_courses():
    if request.method == "GET":
        courses = courses_model.get_courses()
        colleges = college_model.get_colleges()
        return render_template("course.html", courses=courses, colleges=colleges)
    else:
        courses = courses_model.get_courses()
        return courses, 200


@courses.route("/add", methods=["POST"])
def add_courses():
    req = request.json
    course_code = req["course_code"]
    course_name = req["course_name"]
    college_code = req["college_code"]
    courses = courses_model.create_course(course_code, course_name, college_code)
    data = courses[0]
    status_code = courses[1]
    return data, status_code


@courses.route("/get", methods=["POST"])
def get_course():
    req = request.json
    course_code = req["course_code"]
    course = courses_model.get_course(course_code)
    return course, 200
