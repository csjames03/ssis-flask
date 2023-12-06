from flask import Blueprint, render_template, request, jsonify
from app.models.college import Colleges

colleges = Blueprint(
    "colleges", __name__, static_folder="static", template_folder="templates"
)

college_model = Colleges()


@colleges.route("/")
def show_colleges():
    colleges = college_model.get_colleges()
    return render_template("college.html", colleges=colleges)


@colleges.route("/all", methods=["POST"])
def get_all_colleges():
    colleges = college_model.get_colleges()
    return colleges, 200


@colleges.route("/get", methods=["POST"])
def get_college():
    req = request.json
    college_code = req["college_code"]
    print(college_code)
    college = college_model.get_college(college_code)
    data = college[0]

    return data, 200


@colleges.route("/add", methods=["POST"])
def create_college():
    req = request.json
    college_code = req["college_code"]
    college_name = req["college_name"]
    college = college_model.add_college(college_code, college_name)
    message = college[0]
    status_code = college[1]
    return message, status_code


@colleges.route("/edit", methods=["POST"])
def edit_college():
    req = request.json
    college_code = req["college_code"]
    college_name = req["college_name"]
    college = college_model.edit_college(college_code, college_name)
    message = college[0]
    status_code = college[1]
    return message, status_code
