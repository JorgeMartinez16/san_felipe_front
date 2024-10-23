import React from 'react';


function RegisterCar() {
  return (
    <div className="container">
      <h2>Registrar Auto</h2>
      <form>
        <input type="text" placeholder="Placa del Auto" required />
        <input type="text" placeholder="Modelo" required />
        <input type="number" placeholder="Año" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterCar;
