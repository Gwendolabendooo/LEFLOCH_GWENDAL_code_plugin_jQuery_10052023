import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      startDate: '2022-01-01',
      department: 'Sales',
      dateOfBirth: '1990-05-15',
      street: '123 Main Sta',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    {
        firstName: 'marc',
        lastName: 'lat',
        startDate: '2022-01-01',
        department: 'Sales',
        dateOfBirth: '1990-05-15',
        street: '123 Main St',
        city: 'Paris',
        state: 'PA',
        zipCode: '452',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        startDate: '2022-01-01',
        department: 'Sales',
        dateOfBirth: '1990-05-15',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '54',
      },
    // Ajoutez d'autres employés ici
  ]);

  const [sortedBy, setSortedBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (column) => {
    if (sortedBy === column) {
      // Inverse l'ordre de tri si la même colonne est sélectionnée à nouveau
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Trie la colonne sélectionnée par ordre croissant
      setSortedBy(column);
      setSortOrder('asc');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortedBy) {
      const aValue = a[sortedBy];
      const bValue = b[sortedBy];
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  return (
    <div className='m-5 p-5'>
      <h1>Employee List</h1>
      <div className='mt-4'>
        <input
          type="text"
          placeholder="Search Employees"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className='w-100 employee-table mt-4'>
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>
              First Name {sortedBy === 'firstName' && sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th onClick={() => handleSort('lastName')}>
              Last Name {sortedBy === 'lastName' && sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th onClick={() => handleSort('startDate')}>
              Start Date {sortedBy === 'startDate' && sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th onClick={() => handleSort('department')}>
              Department {sortedBy === 'department' && sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th onClick={() => handleSort('dateOfBirth')}>
              Date of Birth {sortedBy === 'dateOfBirth' && sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th onClick={() => handleSort('street')}>Street {sortedBy === 'street' && sortOrder === 'asc' ? '▲' : '▼'}</th>
            <th onClick={() => handleSort('city')}>City {sortedBy === 'city' && sortOrder === 'asc' ? '▲' : '▼'}</th>
            <th onClick={() => handleSort('state')}>State {sortedBy === 'state' && sortOrder === 'asc' ? '▲' : '▼'}</th>
            <th onClick={() => handleSort('zipCode')}>Zip Code {sortedBy === 'zipCode' && sortOrder === 'asc' ? '▲' : '▼'}</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">
        <button className='mt-4'>Go Back</button>
        </Link>
    </div>
  );
};

export default EmployeePage;