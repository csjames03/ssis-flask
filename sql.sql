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
    img_url VARCHAR(255),
    -- Adjust the length according to your needs
    FOREIGN KEY (course_code) REFERENCES course(course_code) ON DELETE CASCADE ON UPDATE CASCADE
);