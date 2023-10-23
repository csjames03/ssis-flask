from app import mysql

class Courses:
    def get_courses(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM course")
        data = cursor.fetchall()
        return data

    def __init__(self):
        pass