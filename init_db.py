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
            last_name VARCHAR(100) NOT NULL,
            course_code VARCHAR(20) NOT NULL,
            year_level VARCHAR(3) NOT NULL,
            sex VARCHAR(10) NOT NULL,
            img_url VARCHAR(255),  -- Adjust the length according to your needs
            FOREIGN KEY (course_code) REFERENCES course(course_code) ON DELETE CASCADE ON UPDATE CASCADE
        );

        INSERT INTO college (college_code, college_name) VALUES
        ('CCS', 'College of Computer Studies'),
        ('CON', 'College of Nursing'),
        ('CED', 'College of Education'),
        ('COE', 'College of Engineering'),
        ('CASS', 'College of Arts and Social Sciences'),
        ('CBA', 'College of Business Administration'),
        ('CAL', 'College of Arts and Letters'),
        ('CNSM', 'College of Natural Sciences and Mathematics'),
        ('CHS', 'College of Health Sciences'),
        ('CSSP', 'College of Social Sciences and Philosophy'),
        ('CDC', 'College of Development Communication'),
        ('CEM', 'College of Economics and Management'),
        ('CHE', 'College of Home Economics'),
        ('CVM', 'College of Veterinary Medicine'),
        ('CPAFS', 'College of Public Affairs and Development'),
        ('CSNR', 'College of Science and Natural Resources'),
        ('CHK', 'College of Human Kinetics'),
        ('CP', 'College of Public Health'),
        ('CFNR', 'College of Forestry and Natural Resources'),
        ('CPG', 'College of Public Governance'),
        ('CA', 'College of Agriculture'),
        ('CMC', 'College of Mass Communication'),
        ('CN', 'College of Nursing'),
        ('CTE', 'College of Teacher Education'),
        ('CSS', 'College of Social Sciences'),
        ('CPAF', 'College of Public Affairs'),
        ('CD', 'College of Dentistry'),
        ('CM', 'College of Medicine'),
        ('CAB', 'College of Arts and Business'),
        ('CES', 'College of Environmental Science'),
        ('CFAD', 'College of Fine Arts and Design'),
        ('CPHM', 'College of Public Health and Medicine'),
        ('CCA', 'College of Communication and Arts'),
        ('CAFA', 'College of Architecture and Fine Arts'),
        ('CCT', 'College of Communication and Technology'),
        ('CPH', 'College of Public Health'),
        ('CPS', 'College of Political Science'),
        ('CLaw', 'College of Law'),
        ('CMBA', 'College of MBA'),
        ('CIA', 'College of Information and Arts'),
        ('CHTM', 'College of Hotel and Tourism Management'),
        ('CBAA', 'College of Business Administration and Accountancy'),
        ('CEA', 'College of Engineering and Architecture'),
        ('CDM', 'College of Digital Marketing'),
        ('CHM', 'College of Hospitality Management'),
        ('CJ', 'College of Journalism'),
        ('CSIT', 'College of Science and Information Technology'),
        ('CMIS', 'College of Management and Information System');


        INSERT INTO course (course_code, course_name, college_code) VALUES
         ('BSCS', 'Computer Science', 'CCS'),
        ('BSCA', 'Computer Applications', 'CCS'),
        ('BSIT', 'Information Technology', 'CCS'),
        ('BSIS', 'Information System', 'CCS'),
        ('NURS', 'Nursing', 'CON'),
        ('EDUC', 'Education', 'CED'),
        ('ENGR', 'Engineering', 'COE'),
        ('ARTS', 'Arts', 'CASS'),
        ('BADM', 'Business Administration', 'CBA'),
        ('LIT', 'Literature', 'CAL'),
        ('SCI', 'Natural Sciences', 'CNSM'),
        ('HLTH', 'Health Sciences', 'CHS'),
        ('SOC', 'Social Sciences', 'CSSP'),
        ('DENT', 'Dentistry', 'CHS'),
        ('PHAR', 'Pharmacy', 'CHS'),
        ('COMM', 'Communication', 'CSSP'),
        ('ECON', 'Economics', 'COE'),
        ('MATH', 'Mathematics', 'CNSM'),
        ('PHIL', 'Philosophy', 'CSSP'),
        ('PSYC', 'Psychology', 'CSSP'),
        ('CHEM', 'Chemistry', 'CNSM'),
        ('ARCH', 'Architecture', 'CASS'),
        ('BMGT', 'Management', 'CBA'),
        ('MKTG', 'Marketing', 'CBA'),
        ('PHYS', 'Physics', 'CNSM'),  
        ('COMP', 'Computer Engineering', 'COE'), 
        ('BIOL', 'Biology', 'CNSM'), 
        ('POL', 'Political Science', 'CSSP'),  
        ('ANTH', 'Anthropology', 'CSSP'), 
        ('AERO', 'Aerospace Engineering', 'COE'),
        ('PHOTO', 'Photography', 'CASS'), 
        ('URB', 'Urban Planning', 'CASS'),
        ('TECH', 'Technology Management', 'CBA'), 
        ('FIN', 'Finance', 'CBA'), 
        ('MUS', 'Music', 'CAL'),  
        ('STAT', 'Statistics', 'CNSM'), 
        ('CMSC', 'Computer Science', 'COE'),
        ('MED', 'Media Studies', 'CAL'),
        ('EDTECH', 'Educational Technology', 'CED'),
        ('LING', 'Linguistics', 'CAL'), 
        ('FILM', 'Film Studies', 'CASS'), 
        ('FOREX', 'Foreign Exchange Management', 'CBA'), 
        ('HIST', 'History', 'CSSP');


INSERT INTO student (student_id, first_name, last_name, course_code, year_level, sex, img_url) VALUES
    ('2023-2001', 'Alice', 'Johnson', 'BSCS', '1st', 'Female', 'https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2002', 'Bob', 'Smith', 'BSIT', '2nd', 'Male','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2003', 'Charlie', 'Miller', 'BSCA', '3rd', 'Male','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2004', 'David', 'Williams', 'COMM', '4th', 'Male','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2005', 'Emily', 'Davis', 'BSCA', '1st', 'Female','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2006', 'Frank', 'Jones', 'MKTG', '2nd', 'Male','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2007', 'Grace', 'Moore', 'URB', '3rd', 'Female','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2008', 'Henry', 'Lee', 'TECH', '4th', 'Male','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2009', 'Isaac', 'Brown', 'STAT', '1st', 'Male','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png'),
    ('2023-2010', 'Jessica', 'Johnson', 'CMSC', '2nd', 'Female','https://res.cloudinary.com/dkjqhuwcn/image/upload/v1701936612/defaut-avatar.png');
    -- Add more records as neededVALUES
        



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
