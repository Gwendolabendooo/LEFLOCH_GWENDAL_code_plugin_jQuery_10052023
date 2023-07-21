import React, { useState } from 'react';

//components
import Dropdown from '../components/dropdown'

const EmployeeTable = ({ employees, columns }) => {
  const [sortedBy, setSortedBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5); // Par défaut, afficher 5 objets par page
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  const itemsArray = [
    {
      label: 5,
      value: 5
    },
    {
      label: 10,
      value: 10
    },
    {
      label: 15,
      value: 15
    },
    {
      label: 20,
      value: 20
    }
  ]

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

  const handleItemsPerPageChange = (val) => {
    console.log(val)
    setItemsPerPage(parseInt(val, 10)); // Mettre à jour le nombre d'objets par page
    setCurrentPage(1); // Réinitialiser la page actuelle à 1 lorsque l'utilisateur change le nombre d'objets par page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  // Pagination - Calcul du premier et du dernier index des objets à afficher sur la page actuelle
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  // Gérer les cas où la page actuelle est en dehors de la plage valide (1 à totalPages)
  if (currentPage < 1) {
    setCurrentPage(1);
  } else if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  // Afficher les numéros de page et les boutons de pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className='mt-4 d-flex flex-row justify-content-between align-items-center'>
        <div>
          <input
            type="text"
            placeholder="Search Employees"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <Dropdown options={itemsArray} label={"Items per page:"} onChange={(val) => handleItemsPerPageChange(val)} />
        </div>
      </div>
      <table className='w-100 employee-table mt-4'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field} onClick={() => handleSort(column.field)}>
                {column.label} {sortedBy === column.field && sortOrder === 'asc' ? '▲' : '▼'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.field}>{employee[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Ajouter les boutons de pagination */}
      <div className="pagination d-flex flex-row mt-3 align-items-center justify-content-center" style={{gap: 20}}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={currentPage === page ? 'active w-auto' : 'inactive w-auto'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;