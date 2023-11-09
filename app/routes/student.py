from flask import Blueprint, render_template, request
from app.models.student import Students

students = Blueprint(
    "students", __name__, static_folder="static", template_folder="templates"
)

students_model = Students()


@students.route("/")
def show_students():
    students = students_model.get_students()
    return render_template("student.html", students=students)


@students.route("/getStudentIds", methods=["POST"])
def getStudentIds():
    try:
        students_ids = students_model.get_students_ids()
        print(students_ids)
        return {"messages": "Successfully retrieved"}, 200
    except Exception as e:
        return {"messages": str(e)}, 400
