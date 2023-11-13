from app import mysql


class Colleges:
    def get_colleges(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM college")
        data = cursor.fetchall()
        return data
