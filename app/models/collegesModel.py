from app import mysql

class Colleges:
    @classmethod
    def get_colleges(cls):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM college")
        data = cursor.fetchall()
        return data

    @classmethod
    def add_college(cls, code, name):
        cursor = mysql.new_cursor()
        
        # Check if the college with the given code already exists
        cursor.execute("SELECT code FROM college WHERE code = %s", (code,))
        existing_college = cursor.fetchone()
        
        if existing_college:
            return False  # College with the code already exists
        else:
            cursor.execute("INSERT INTO college (code, name) VALUES (%s, %s)", (code, name))
            mysql.connection.commit()  
            return True  # College added successfully

    @classmethod
    def delete_college(cls, code):
        cursor = mysql.new_cursor()

        # Check if the college with the given code exists
        cursor.execute("SELECT code FROM college WHERE code = %s", (code,))
        existing_college = cursor.fetchone()

        if not existing_college:
            return False  # College with the code does not exist

        # Check if there are any courses associated with the college
        cursor.execute("SELECT COUNT(*) FROM course WHERE college_code = %s", (code,))
        course_count = cursor.fetchone()[0]  # Access the first element of the tuple

        if course_count == 0:
            # No courses associated with the college, safe to delete
            cursor.execute("DELETE FROM college WHERE code = %s", (code,))
            mysql.connection.commit()  # Use cursor.connection.commit() to commit the transaction
            return True  # College deleted successfully
        else:
            return False 

    @classmethod
    def edit_college_name(cls, code, new_name):
        cursor = mysql.new_cursor()
        # Check if the college with the given code exists
        cursor.execute("SELECT code FROM college WHERE code = %s", (code,))
        existing_college = cursor.fetchone()
        
        if not existing_college:
            return False  # College with the code does not exist
        else:
            cursor.execute("UPDATE college SET name = %s WHERE code = %s", (new_name, code))
            mysql.connection.commit()    # Use mysql.commit() to commit the transaction
            return True  # College name updated successfully
