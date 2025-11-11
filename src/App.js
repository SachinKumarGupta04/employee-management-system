import React, { useState } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT', email: 'john@example.com', salary: 75000 },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', email: 'jane@example.com', salary: 85000 },
    { id: 3, name: 'Mike Johnson', position: 'Designer', department: 'Design', email: 'mike@example.com', salary: 70000 }
  ]);
  
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Math.max(...employees.map(e => e.id), 0) + 1
    };
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setEditingEmployee(null);
    setShowForm(false);
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Employee Management System</h1>
        <p>Manage your workforce efficiently</p>
      </header>
      
      <div className="container">
        <div className="stats">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p className="stat-number">{employees.length}</p>
          </div>
          <div className="stat-card">
            <h3>Departments</h3>
            <p className="stat-number">{new Set(employees.map(e => e.department)).size}</p>
          </div>
          <div className="stat-card">
            <h3>Avg Salary</h3>
            <p className="stat-number">${(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length).toFixed(0)}</p>
          </div>
        </div>

        <button 
          className="btn btn-primary add-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Employee'}
        </button>

        {showForm && (
          <EmployeeForm 
            employee={editingEmployee}
            onSubmit={editingEmployee ? updateEmployee : addEmployee}
            onCancel={handleCancel}
          />
        )}

        <EmployeeList 
          employees={employees}
          onEdit={handleEdit}
          onDelete={deleteEmployee}
        />
      </div>
    </div>
  );
}

export default App;
