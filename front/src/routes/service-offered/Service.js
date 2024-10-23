import React from 'react';


function Service({ service }) {
  return (
    <div className="container">
      <h2>Detalles del Servicio</h2>
      <p>Nombre: {service.name}</p>
      <p>Precio: {service.price}</p>
    </div>
  );
}

export default Service;
