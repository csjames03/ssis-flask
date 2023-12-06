from flask import Blueprint, render_template, request, jsonify
from app.models.college import Colleges

colleges = Blueprint(
    "colleges", __name__, static_folder="static", template_folder="templates"
)

college_model = Colleges()


@colleges.route("/")
def show_colleges():
    colleges = college_model.get_colleges()
    print(colleges)
    return render_template("college.html", colleges=colleges)


@colleges.route("/get", methods=["POST"])
def get_college():
    req = request.json
    college_code = req["college_code"]
    college = college_model.get_college(college_code)
    data = college[0]

    return data, 200


@colleges.route("/add", methods=["POST"])
def create_college():
    req = request.json
    college_code = req["college_code"]
    college_name = req["college_name"]
    print(college_code, college_name)
    return {"message": "College Added Successfully"}, 200
