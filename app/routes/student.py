from flask import Blueprint, render_template, request, jsonify
from app.models.student import Students
from app.models.course import Courses
from cloudinary.uploader import upload

students = Blueprint(
    "students", __name__, static_folder="static", template_folder="templates"
)

students_model = Students()
courses_model = Courses()


@students.route("/", methods=["GET", "POST"])
def show_students():
    if request.method == "GET":
        students = students_model.get_students()
        courses = courses_model.get_courses()
        return render_template("student.html", students=students, courses=courses)
    else:
        students = students_model.get_students()
        return students, 200


@students.route("/get", methods=["POST"])
def show_student():
    req = request.json
    student_id = req["student_id"]
    student = students_model.get_student(student_id)
    studentInfo = student[0]
    status_code = student[1]
    return studentInfo, 200


@students.route("/add", methods=["POST"])
def add_students():
    try:
        student_id = request.form.get("student_id")
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        gender = request.form.get("gender")
        year_level = request.form.get("year_level")
        course_code = request.form.get("course_code")

        if "img" in request.files:
            file = request.files["img"]
            print(file)
            # Upload the image to Cloudinary
            upload_result = upload(file)

            # Access the Cloudinary URL of the uploaded image
            cloudinary_url = upload_result["secure_url"]
            # Handle the file as needed (e.g., save it to disk, process it, etc.)
        else:
            cloudinary_url = "https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png"

        img_url = cloudinary_url
        create_student = students_model.add_student(
            student_id, first_name, last_name, gender, year_level, course_code, img_url
        )
        message = create_student[0]
        status_code = create_student[1]

        return {"message": message, "img_url": img_url}, status_code
    except Exception as e:
        # Handle exceptions appropriately, log the error, and return an error response
        print(f"Error processing the request: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@students.route("/edit", methods=["POST"])
def edit_student():
    req = request.json
    student_id = req["student_id"]
    first_name = req["first_name"]
    last_name = req["last_name"]
    gender = req["sex"]
    year_level = req["year_level"]
    course_code = req["course_code"]
    student = students_model.edit_student(
        student_id, first_name, last_name, gender, year_level, course_code
    )

    message = student[0]
    status_code = student[1]

    return message, status_code


@students.route("/delete", methods=["POST"])
def delete_student():
    req = request.json
    student_id = req["student_id"]
    student = students_model.delete_student(student_id)
    message = student[0]
    status_code = student[1]

    return message, status_code


@students.route("/search", methods=["POST"])
def search_student():
    req = request.json
    query = req["query"]
    print(query)
    student = students_model.search_students_across_columns(query)
    message = student[0]
    status_code = student[1]

    return message, status_code


@students.route("/upload")
def upload_images():
    return render_template("upload.html")
