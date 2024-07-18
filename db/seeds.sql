\c employee_db;

-- Insert Departments
INSERT INTO department (name) VALUES
('HR'),
('Engineering'),
('Marketing'),
('Operations'),
('Customer Relations');

-- Insert Roles
INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 70000.00, 2),
('Marketing Director', 120000.00, 1),
('Marketing Specialist', 60000.00, 3),
('Sales Manager', 80000.00, 1),
('Sales Assistant', 50000.00, 3),
('HR Manager', 90000.00, 3),
('Operations Manager', 120000.00, 4),
('Customer Relations Specialist', 75000.00, 5);

-- Insert Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jane', 'Brown', 1, NULL),
('Benjamin', 'Crews', 1, NULL),
('Diego', 'Garcia', 2, 1),
('Donald', 'Groves', 3, 1),
('Joshua', 'Cable', 1, NULL),
('Brandon', 'Kingston', 2, 1),
('Barbara', 'Green', 2, 1);
