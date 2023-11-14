from app import mysql


class Courses:
    def get_courses(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute(
            "SELECT course.course_code, course.course_name, course.college_code, college.college_name, COUNT(student.student_id) AS student_count FROM course JOIN college ON course.college_code = college.college_code LEFT JOIN student ON course.course_code = student.course_code GROUP BY course.course_code, course.course_name, course.college_code, college.college_name;"
        )
        data = cursor.fetchall()
        return data

    def check_if_course_code_already_exists(self, course_code):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            cursor.execute(
                "SELECT * FROM course WHERE course_code = %s", (course_code,)
            )
            result = cursor.fetchone()

            if result:
                return True
            else:
                return False
        except Exception as e:
            return False

    def get_course(self, course_id):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            cursor.execute(
                "SELECT * FROM course where course_id = %s",
                course_id,
            )
            data = cursor.fetchone()
            return data
        except Exception as e:
            return {"message": e.message}, 404

    def create_course(self, course_code, course_name, college_code):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            course_code_exist = self.check_if_course_code_already_exists(course_code)
            if course_code_exist:
                return {"message": "Course Code already exists"}, 500
            cursor.execute(
                "INSERT INTO course (course_code, course_name, college_code) VALUES (%s, %s, %s)",
                (course_code, course_name, college_code),
            )
            mysql.connection.commit()
            return {"message": "Course created successfully"}, 201
        except Exception as e:
            return {"message": str(e)}, 404

    def update_course(self, course_code, course_name):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            cursor.execute(
                "UPDATE course where course_code = %s SET course_name = %s",
                course_code,
                course_name,
            )
            mysql.connection.commit()
            return {"message": "Course updated successfully"}, 201
        except Exception as e:
            return {"message": e.message}, 404
