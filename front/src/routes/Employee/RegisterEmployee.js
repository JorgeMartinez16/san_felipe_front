import React from 'react';

function RegisterEmployee() {
  return (
    <div className="container">
      <h2>Registrar Empleado</h2>
      <form>
        <input type="text" placeholder="Nombre del Empleado" required />
        <input type="text" placeholder="Rol" required />
        <input type="date" placeholder="Fecha de Ingreso" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterEmployee;
