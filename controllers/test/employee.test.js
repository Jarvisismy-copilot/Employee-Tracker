const { Client } = require('pg');
const chai = require('chai');
const expect = chai.expect;

const client = new Client({
  user: 'your_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});

describe('Employee Management', function() {
  before(async function() {
    await client.connect();
  });

  after(async function() {
    await client.end(); 
  });

  describe('Add Employee', function() {
    it('should add a new employee', async function() {
      const res = await client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        ['TestFirst', 'TestLast', 1, null]
      );
      expect(res.rows[0]).to.include({ first_name: 'TestFirst', last_name: 'TestLast' });
    });
  });

  describe('Update Employee Role', function() {
    it('should update the employee role', async function() {
      // First, add an employee to be updated
      const addRes = await client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        ['UpdateFirst', 'UpdateLast', 1, null]
      );
      const employeeId = addRes.rows[0].id;

      // Now, update the role of the added employee
      const updateRes = await client.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
        [2, employeeId]
      );
      expect(updateRes.rows[0].role_id).to.equal(2);
    });
  });

  describe('View Employees', function() {
    it('should return all employees', async function() {
      const res = await client.query('SELECT * FROM employee');
      expect(res.rows).to.be.an('array');
    });
  });

  describe('View Departments', function() {
    it('should return all departments', async function() {
      const res = await client.query('SELECT * FROM department');
      expect(res.rows).to.be.an('array');
    });
  });
});
