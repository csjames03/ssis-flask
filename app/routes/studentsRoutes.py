from flask import Blueprint, render_template, request

students = Blueprint('students', __name__, static_folder="static", template_folder="templates")

from app.models.studentsModel import Students
from app.models.coursesModel import Courses

students_model = Students()
courses_model = Courses()

@students.route('/')
def show_students():
    students = students_model.get_students()
    courses = courses_model.get_courses()
    print(courses)
    return render_template('student.html', students=students, courses=courses)


@students.route('/addstudent', methods=['POST'])
def add_student():
    data = request.get_json()
    student_id = data.get('id')
    student_fname = data.get('fname')
    student_mname = data.get('mname')
    student_lname = data.get('lname')
    student_bdate = data.get('date')
    student_sex = data.get('sex')
    student_email = data.get('email')
    student_course = data.get('course')
    student_year = data.get('year')
    
    isUnique = students_model.id_is_unique(student_id)
    if not isUnique:
         return {'message': f'The id {student_id} exist already' }, 400
    
    add_student = students_model.add_student(student_id, student_fname, student_mname, student_lname, student_bdate, student_sex, student_email, student_course, student_year)

    if add_student:
        return {'message': 'Student added successfully' }, 200
    else :
        return {'message': 'Unfortunately student was not added successfully'}, 400

@students.route('/deletestudent', methods=['POST'])
def delete_student():
    data = request.get_json()
    student_id = data.get('id')
    delete_student = students_model.delete_student(student_id)
    if delete_student:
        return {'message': 'Student  deleted successfully'}, 200
    else:
        return {'message': 'Unfortunately student was not deleted successfully'}, 400
