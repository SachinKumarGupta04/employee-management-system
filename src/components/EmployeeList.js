import React from 'react';
import './EmployeeList.css';

function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <div className="no-employees">No employees found. Add your first employee!</div>;
  }

  return (
    <div className="employee-list">
      <h2>Employee Directory</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td><span className="department-badge">{employee.department}</span></td>
                <td>{employee.email}</td>
                <td>${employee.salary.toLocaleString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn btn-edit"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
