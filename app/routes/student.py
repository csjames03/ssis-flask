from flask import Blueprint, render_template, request

students = Blueprint(
    "students", __name__, static_folder="static", template_folder="templates"
)


@students.route("/")
def show_students():
    return render_template("student.html")
