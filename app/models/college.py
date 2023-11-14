from app import mysql


class Colleges:
    def get_colleges(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM college")
        data = cursor.fetchall()
        return data

    def is_college_code_taken(self, college_code):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM college where college_code = %s", (college_code,))
        result = cursor.fetchone()
        if result:
            return True
        else:
            return False

    def add_college(
        self,
        college_code,
        college_name,
    ):
        cursor = mysql.new_cursor(dictionary=True)
        if self.is_college_code_taken(college_code):
            return {"message": "College Code is already taken"}, 400
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute(
                """
                INSERT INTO college (college_code, college_name)
                VALUES (%s, %s)
                """,
                (college_code, college_name),
            )

            mysql.connection.commit()

            return {"message": "College created successfully"}, 201

        except Exception as e:
            return {"message": e}, 500

    def does_college_code_exist_in_courses(self, college_code):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM course where college_code = %s", (college_code,))
        result = cursor.fetchone()
        if result:
            return True
        else:
            return False

    def delete_college(self, college_code):
        cursor = mysql.new_cursor(dictionary=True)
        if self.does_college_code_exist_in_courses(college_code):
            return {"message": "You cannot delete this college"}, 400
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute(
                "DELETE FROM college WHERE college_code = %s", (college_code,)
            )

            mysql.connection.commit()

            return {"message": "College deleted successfully"}, 201

        except Exception as e:
            return {"message": e}, 500

    def edit_college(self, college_name, college_code):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            cursor = mysql.new_cursor(dictionary=True)

            cursor.execute(
                "UPDATE college SET college_name = %s WHERE college_code = %s",
                (college_name, college_code),
            )

            mysql.connection.commit()

            return {"message": "College updated successfully"}, 201

        except Exception as e:
            return {"message": e}, 500

    def get_college(self, college_code):
        cursor = mysql.new_cursor(dictionary=True)
        try:
            cursor.execute(
                "SELECT * FROM college WHERE college_code = %s", (college_code,)
            )

            data = cursor.fetchone()

            if data:
                return (
                    data,
                    200,
                )
            else:
                return {"message": "College not found"}, 404

        except Exception as e:
            return {"message": str(e)}, 500
