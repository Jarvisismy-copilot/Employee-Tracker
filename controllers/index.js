const { Client } = require('pg');
const inquirer = require('inquirer');

const client = new Client({
  user: 'your_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});

async function updateEmployeeRole() {
  const employees = await client.query('SELECT id, first_name, last_name FROM employee');
  const roles = await client.query('SELECT id, title FROM role');

  const { employeeId, newRoleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'Select the new role for the employee:',
      choices: roles.rows.map(role => ({ name: role.title, value: role.id })),
    },
  ]);

  await client.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [newRoleId, employeeId]
  );

  console.log('Employee role updated successfully.');
}

async function main() {
  await client.connect();

  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Departments', 'Add Employee', 'View Employees', 'Update Employee Role', 'Exit'],
  });

  if (action === 'View Departments') {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
  } else if (action === 'Add Employee') {
    const answers = await inquirer.prompt([
      { type: 'input', name: 'first_name', message: 'First Name:' },
      { type: 'input', name: 'last_name', message: 'Last Name:' },
      { type: 'input', name: 'role_id', message: 'Role ID:' },
      { type: 'input', name: 'manager_id', message: 'Manager ID (optional):', default: null },
    ]);
    await client.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
    );
    console.log('Employee added successfully.');
  } else if (action === 'View Employees') {
    const res = await client.query('SELECT * FROM employee');
    console.table(res.rows);
  } else if (action === 'Update Employee Role') {
    await updateEmployeeRole();
  } else {
    await client.end();
    return;
  }

  main(); // Restart the prompt loop
}

main().catch(err => console.error(err));



require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});