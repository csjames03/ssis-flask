from app import mysql


class Courses:
    def get_courses(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM course")
        data = cursor.fetchall()
        return data

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
            cursor.execute(
                "Insert into course (course_id, course_name, college_code) values (%s, %s, %s)",
                course_code,
                course_name,
                college_code,
            )
            mysql.connection.commit()
            return {"message": "Course created successfully"}, 201
        except Exception as e:
            return {"message": e.message}, 404

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
