import React from "react";

function Cars() {
  const cars = [
    { plate: 'ABC123', model: 'Toyota Corolla', year: 2019 },
    { plate: 'XYZ987', model: 'Honda Civic', year: 2020 },
  ];

  return (
    <div className="container">
      <h2>Lista de Autos</h2>
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.plate}>
              <td>{car.plate}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;
