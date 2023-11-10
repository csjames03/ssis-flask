from app import mysql


class Students:
    def get_students(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM student")
        data = cursor.fetchall()
        return data

    def get_student(self, student_id):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM student where student_id = %s", (student_id,))
        data = cursor.fetchone()
        return data

    def is_student_id_taken(self, student_id):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM student where student_id = %s", (student_id,))
        result = cursor.fetchone()
        if result:
            return True
        else:
            return False

    def add_student(
        self, student_id, first_name, last_name, gender, year_level, course_code
    ):
        if self.is_student_id_taken(student_id):
            return {"message": "Student ID is already taken"}, 400
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute(
                """
                INSERT INTO student (student_id, first_name, last_name, course_code, year_level, sex)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (student_id, first_name, last_name, course_code, year_level, gender),
            )

            mysql.connection.commit()

            return {"message": "Student added successfully"}, 201

        except Exception as e:
            print("Error adding student:", e)
            return {"message": "Error adding student"}, 500
