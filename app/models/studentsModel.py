from app import mysql

class Students:
    def get_students(self):
        cursor = mysql.new_cursor(dictionary=True)
        cursor.execute("SELECT * FROM student")
        data = cursor.fetchall()
        return data
    
    def add_student(self, id, fname, mname, lname, bdate, gender, email, course, year ):
        cursor = mysql.new_cursor()
        try:
            cursor.execute("INSERT INTO student (id, firstname, middlename, lastname, email, birthdate, course_code, year, gender) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (id, fname, mname, lname, email, bdate, course, year, gender))
            mysql.connection.commit()
            return True
        except: 
            return False
        
    def id_is_unique(self, id):
        cursor = mysql.new_cursor()
        cursor.execute("SELECT * FROM student where id = %s", (id,))
        data = cursor.fetchone()
        if data:
            return False
        else: 
            return True

        
