import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Table from '../components/Table'

const EmployeePage = ({employees}) => {
  const columns = [
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
    { label: 'Start Date', field: 'startDate' },
    { label: 'Department', field: 'department' },
    { label: 'Date of Birth', field: 'dateOfBirth' },
    { label: 'Street', field: 'street' },
    { label: 'City', field: 'city' },
    { label: 'State', field: 'state' },
    { label: 'Zip Code', field: 'zipCode' },
  ];

  if (!employees) {
    return(
      'loading'
    )
  }

  return (
    <div className='m-3 p-3 d-flex flex-column'>
      <h1 className='mb-3'>Employee List</h1>
      <Table employees={employees} columns={columns} />
      <Link to="/">
        <button className='mt-4'>Go Back</button>
        </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

export default connect(mapStateToProps)(EmployeePage);