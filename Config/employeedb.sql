
CREATE DATABASE employee

USE employee

CREATE TABLE employees(
	ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    DEPARTMENT ENUM('design','development','testing','hr','finance') NOT NULL,
    DESIGNATION ENUM('designlead','developer','tester','manager','seniordeveloper','intern') NOT NULL,
    PROJECT ENUM('car rental','ecommerce') NULL DEFAULT  NULL ,
    EMPLOYEE_TYPE ENUM('office','remote') NOT NULL,
	EMPLOYEE_STATUS ENUM('permanent','part-time','interns') NOT NULL
)