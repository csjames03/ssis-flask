from app import mysql


class Students:
    def get_students(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM student")
        data = cursor.fetchall()
        return data

    def get_student(self, student_id):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM student where student_id = %s", (student_id,))
            data = cursor.fetchone()
            return data, 200
        except Exception as e:
            return {"message": e.message}, 500

    def is_student_id_taken(self, student_id):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM student where student_id = %s", (student_id,))
        result = cursor.fetchone()
        if result:
            return True
        else:
            return False

    def add_student(
        self,
        student_id,
        first_name,
        last_name,
        gender,
        year_level,
        course_code,
        img_url,
    ):
        if self.is_student_id_taken(student_id):
            return {"message": "Student ID is already taken"}, 400
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute(
                """
                INSERT INTO student (student_id, first_name, last_name, course_code, year_level, sex, img_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    student_id,
                    first_name,
                    last_name,
                    course_code,
                    year_level,
                    gender,
                    img_url,
                ),
            )

            mysql.connection.commit()

            return {"message": "Student added successfully"}, 201

        except Exception as e:
            return {"message": "Error adding student"}, 500

    def edit_student(
        self,
        student_id,
        first_name,
        last_name,
        gender,
        year_level,
        course_code,
        img_url,
    ):
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute(
                """UPDATE student SET first_name = %s, last_name = %s, course_code = %s, year_level = %s, sex = %s, img_url = %s WHERE student_id = %s""",
                (
                    first_name,
                    last_name,
                    course_code,
                    year_level,
                    gender,
                    img_url,
                    student_id,
                ),
            )

            mysql.connection.commit()
            print(f"Models: {img_url}")
            return {"message": "Student edited successfully"}, 201

        except Exception as e:
            print(e)
            return {"message": "Error editing student"}, 500

    def delete_student(self, student_id):
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute("DELETE FROM student WHERE student_id = %s", (student_id,))

            mysql.connection.commit()

            return {"message": "Student Deleted Successfully"}, 201
        except Exception as e:
            return {"message": "Error deleting student"}, 500

    def get_student_with_course_id(self, course_id):
        print("Model")
        try:
            cursor = mysql.new_cursor(dictionary=True)
            cursor.execute("SELECT * FROM student WHERE course_code = %s", (course_id,))
            student_exist = cursor.fetchone()
            if student_exist:
                return True
            else:
                return False
        except Exception as e:
            return False

    def search_students_across_columns(self, search_term):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            # Construct a dynamic query to search across all columns except "gender"
            columns_query = "SHOW COLUMNS FROM student"
            cursor.execute(columns_query)
            columns = [column["Field"] for column in cursor.fetchall()]

            if not columns:
                return {"message": "No columns found in the student table"}, 500

            # Exclude the "gender" column from the search
            columns_to_search = [
                column for column in columns if column != "sex" and column != "img_url"
            ]

            # Construct a dynamic query using CONCAT for selected columns
            concatenated_columns = ", ".join(
                [f"CONCAT_WS(' ', {column})" for column in columns_to_search]
            )
            query = f"SELECT * FROM student WHERE CONCAT_WS(' ', {concatenated_columns}) LIKE %s"

            # Use the LIKE operator to search for the specified term
            cursor.execute(query, ("%" + search_term + "%",))

            data = cursor.fetchall()
            return data, 200
        except Exception as e:
            return {"message": str(e)}, 500
