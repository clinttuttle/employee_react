import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import EditEmployee from './EditEmployee';

const initialEmployees = [
  { id: 1, first_name: 'John', last_name: 'Doe', address: '123 Main St', city: 'Austin', state: 'TX', zip: '78701', email: 'john.doe@example.com', salary: 60000, phone: '123-456-7890' },
  { id: 2, first_name: 'Jane', last_name: 'Smith', address: '456 Elm St', city: 'Dallas', state: 'TX', zip: '75201', email: 'jane.smith@example.com', salary: 65000, phone: '987-654-3210' },
  // Add more mock data as needed
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmployeeList employees={employees} handleDelete={handleDelete} />} />
          <Route path="/add" element={<AddEmployee setEmployees={setEmployees} employees={employees} />} />
          <Route path="/edit/:id" element={<EditEmployee employees={employees} setEmployees={setEmployees} />} />
        </Routes>
      </div>
    </Router>
  );
}

function EmployeeList({ employees, handleDelete }) {
  return (
    <div>
      <h1>Employee List</h1>
      <div className="add-employee-container">
        <Link to="/add">
          <button className="add-employee-button">Add Employee</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.address}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zip}</td>
              <td>{employee.email}</td>
              <td>{employee.salary}</td>
              <td>{employee.phone}</td>
              <td>
                <Link to={`/edit/${employee.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddEmployee({ setEmployees, employees }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    salary: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employees.length + 1,
      ...formData
    };
    setEmployees([...employees, newEmployee]);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>
        <div>
          <label>Zip:</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default App;
