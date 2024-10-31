// src/EditEmployee.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee({ employees, setEmployees }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(emp => emp.id === parseInt(id));

  const [formData, setFormData] = useState({
    first_name: employee.first_name,
    last_name: employee.last_name,
    address: employee.address,
    city: employee.city,
    state: employee.state,
    zip: employee.zip,
    email: employee.email,
    salary: employee.salary,
    phone: employee.phone
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
    const updatedEmployees = employees.map(emp =>
      emp.id === parseInt(id) ? { ...emp, ...formData } : emp
    );
    setEmployees(updatedEmployees);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Employee</h1>
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

export default EditEmployee;
