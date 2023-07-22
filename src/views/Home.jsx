import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { addEmployee } from '../actions';

//modal package
import Modal from '@gwendish/modal-react'

//components
import Dropdown from '../components/dropdown'
import Calendar from '../components/Calendar';

const Home = ({employees, addEmployee}) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  const departmentList = [
    { label: 'Sales', value: 'Sales' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Human Resources', value: 'Human Resources' }
  ]

  const stateList = [
    { label: 'Alabama', value: 'Alabama' },
    { label: 'Alaska', value: 'Alaska' },
    { label: 'Arizona', value: 'Arizona' },
    { label: 'Arkansas', value: 'Arkansas' },
    { label: 'California', value: 'California' }
  ]

  const saveEmployee = () => {
    // Check if all fields are filled
    if (
      firstName === '' ||
      lastName === '' ||
      dateOfBirth === null ||
      startDate === null ||
      street === '' ||
      city === '' ||
      state === '' ||
      zipCode === '' ||
      department === ''
    ) {
      setError('Please fill in all fields');
    } else {
      // Logic to save the employee
      const newEmployee = {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString().slice(0, 10),
        startDate: startDate.toISOString().slice(0, 10),
        street,
        city,
        state,
        zipCode,
        department,
      };
      console.log(newEmployee, employees)
      addEmployee(newEmployee)
      setShowConfirmation(true);
      setError('');
    }
  };

  const handleClose = () => {
    // Handle any actions after modal is closed, if needed.
    navigate('/Employees')
  };

  const updateDate = (date) => {
    setStartDate(date);
  };

  const updateBirth = (date) => {
    setDateOfBirth(date);
  };

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/Employees">View current employees</Link>
        <h2>Create Employee</h2>
        <form onSubmit={e => e.preventDefault()} id="create-employee">
          <label htmlFor="first-name">First Name *</label>
          <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label htmlFor="last-name">Last Name *</label>
          <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <Calendar label={'Date of Birth *'} updateDate={updateBirth} />

          <Calendar label={'Start date *'} updateDate={updateDate} />

          <fieldset className="address d-flex flex-column">
            <legend>Address</legend>

            <label htmlFor="street">Street *</label>
            <input id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />

            <label htmlFor="city">City *</label>
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />

            <Dropdown options={stateList} label={"State *"} defaultValue={"-- Choose a state --"} onChange={(val) => setState(val)} />

            <label className='mt-2' htmlFor="zip-code">Zip Code *</label>
            <input id="zip-code" type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </fieldset>

          <Dropdown options={departmentList} label={"Department *"} defaultValue={"-- Choose a department --"} onChange={(val) => setDepartment(val)} />
        </form>

        {error && <p className="error text-danger">{error}</p>}

        <button style={{backgroundColor: '#74986c', fontWeight: 'bold', color: 'black'}} onClick={saveEmployee}>Save</button>
      </div>
      {showConfirmation &&
        <Modal
          title="Employee Created!"
          description="You will be redirected to the employee list"
          onClose={handleClose}
          modalBackground="rgba(0, 0, 0, 0.8)"
          containerBackground="#fff"
        />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

export default connect(mapStateToProps, { addEmployee })(Home);