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


@courses.route("/edit", methods=["POST"])
def edit_student():
    req = request.json
    course_code = req["course_code"]
    course_name = req["course_name"]
    college_code = req["college_code"]
    print(course_code)
    course = courses_model.update_course(
        course_code,
        course_name,
        college_code,
    )

    message = course[0]
    status_code = course[1]

    return message, status_code


@courses.route("/delete", methods=["POST"])
def delete_course():
    req = request.json
    course_code = req["course_code"]
    course_delete = courses_model.delete_course(
        course_code,
    )
    message = course_delete[0]
    status_code = course_delete[1]
    return message, status_code


@courses.route("/search", methods=["POST"])
def search_course():
    req = request.json
    query = req["query"]
    course = courses_model.search_courses_across_columns(query)
    message = course[0]
    status_code = course[1]

    return message, status_code
