import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Access the environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")


def initialize_database():
    try:
        connection = mysql.connector.connect(
            host=db_host, user=db_user, password=db_password, database=db_name
        )

        cursor = connection.cursor()

        sql_script = """
        DROP DATABASE IF EXISTS `student-information-system`;
        CREATE DATABASE IF NOT EXISTS `student-information-system`;
        USE `student-information-system`;
        CREATE TABLE IF NOT EXISTS college (
            college_code VARCHAR(20) PRIMARY KEY,
            college_name VARCHAR(100) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS course (
            course_code VARCHAR(20) PRIMARY KEY,
            course_name VARCHAR(200) NOT NULL,
            college_code VARCHAR(20) NOT NULL,
            FOREIGN KEY (college_code) REFERENCES college(college_code) ON DELETE CASCADE ON UPDATE CASCADE
        );
        CREATE TABLE IF NOT EXISTS student (
            student_id CHAR(9) PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            middle_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            course_code VARCHAR(20) NOT NULL,
            year_level INT NOT NULL,
            sex VARCHAR(10) NOT NULL,
            email VARCHAR(100) NOT NULL,
            FOREIGN KEY (course_code) REFERENCES course(course_code) ON DELETE CASCADE ON UPDATE CASCADE
        );
        """

        # Execute the SQL script as separate statements
        for statement in sql_script.split(";"):
            if statement.strip():
                cursor.execute(statement)

        connection.commit()
        cursor.close()
        connection.close()

        print("Database initialized.")

    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    initialize_database()
