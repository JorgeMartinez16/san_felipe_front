import React from 'react';

function Client({ client }) {
  return (
    <div className="container">
      <h2>Detalles del Cliente</h2>
      <p>Nombre: {client.name}</p>
      <p>Teléfono: {client.phone}</p>
    </div>
  );
}

export default Client;
