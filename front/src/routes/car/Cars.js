import React, { useState, useEffect } from 'react';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ licencePlate: '', make: '', color: '' });
  const [searchPlate, setSearchPlate] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Recupera el token del localStorage
  const token = localStorage.getItem('token');

  // Función para obtener la lista de autos
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/cars', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener la lista de autos');
      const data = await response.json();
      setCars(data);
      setIsSearching(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Registrar un auto
  const handleRegisterCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/cars/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        const savedCar = await response.json();
        setCars([...cars, savedCar]);
        setSuccessMessage('Auto registrado con éxito');
        setNewCar({ licencePlate: '', make: '', color: '' });
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Error al registrar el auto: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Buscar un auto por placa
  const handleSearchCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/cars/${searchPlate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const car = await response.json();
        setCars([car]);  // Mostrar solo el auto encontrado en la tabla
        setSuccessMessage('Auto encontrado con éxito');
        setIsSearching(true);  // Cambiar a modo de búsqueda
        setError('');
      } else {
        setCars([]);
        setError('No se encontró ningún auto con esa placa');
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Eliminar un auto
  const handleDeleteCar = async (licencePlate) => {
    try {
      const response = await fetch(`http://localhost:8080/cars/${licencePlate}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCars(cars.filter((car) => car.licencePlate !== licencePlate));
        setSuccessMessage(`Auto con placa ${licencePlate} eliminado con éxito`);
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Error al eliminar el auto: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Mostrar todos los autos después de una búsqueda
  const handleListCars = () => {
    fetchCars();
  };

  return (
    <div className="container">
      <h2>Lista de Autos</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {/* Botones para listar todos o buscar */}
      <div>
        <button onClick={handleListCars}>Listar Todos</button>
        <form onSubmit={handleSearchCar} style={{ display: 'inline-block', marginLeft: '10px' }}>
          <input
            type="text"
            placeholder="Buscar por Placa"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            required
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      {/* Tabla de autos */}
      <table className="cars-table">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car.licencePlate}>
                <td>{car.licencePlate}</td>
                <td>{car.make}</td>
                <td>{car.color}</td>
                <td>
                  <button onClick={() => handleDeleteCar(car.licencePlate)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                {isSearching ? 'No se encontró ningún auto con esa placa' : 'No hay autos registrados'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Registrar Nuevo Auto</h3>
      <form onSubmit={handleRegisterCar}>
        <input
          type="text"
          placeholder="Placa"
          value={newCar.licencePlate}
          onChange={(e) => setNewCar({ ...newCar, licencePlate: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          value={newCar.make}
          onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Color"
          value={newCar.color}
          onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
          required
        />
        <button type="submit">Registrar Auto</button>
      </form>
    </div>
  );
};

export default Cars;
