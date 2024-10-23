import React from 'react';

function Employees() {
  const employees = [
    { name: 'Juan Pérez', role: 'Lavador', startDate: '2021-03-12' },
    { name: 'María López', role: 'Supervisor', startDate: '2020-11-07' },
  ];

  return (
    <div className="container">
      <h2>Lista de Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Fecha de Ingreso</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.name}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
