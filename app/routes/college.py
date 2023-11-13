from flask import Blueprint, render_template, request
from app.models.college import Colleges

colleges = Blueprint(
    "colleges", __name__, static_folder="static", template_folder="templates"
)

college_model = Colleges()


@colleges.route("/")
def show_colleges():
    colleges = college_model.get_colleges()
    print(colleges)
    return render_template("student.html", colleges=colleges)
