from flask import Blueprint, render_template, request
from app.models.course import Courses

courses = Blueprint(
    "courses", __name__, static_folder="static", template_folder="templates"
)

courses_model = Courses()


@courses.route("/")
def show_colleges():
    courses = courses_model.get_courses()
    print(courses)
    return render_template("student.html", courses=courses)
