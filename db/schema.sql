-- departments table
drop database if exists employee_db; 
create database employee_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- roles table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department
        FOREIGN KEY(department_id) 
        REFERENCES department(id)
);

-- employees table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES role(id),
    CONSTRAINT fk_manager
        FOREIGN KEY(manager_id) 
        REFERENCES employee(id)
);
