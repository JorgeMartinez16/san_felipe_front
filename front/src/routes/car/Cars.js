import React, { useState, useEffect } from 'react';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ licencePlate: '', make: '', color: '' });
  const [searchPlate, setSearchPlate] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Función para obtener la lista de autos
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/cars');
      if (!response.ok) {
        throw new Error('Error al obtener la lista de autos');
      }
      const data = await response.json();
      setCars(data); // Asegúrate de que `data` es un array de autos
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegisterCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/cars/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const handleSearchCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/cars/${searchPlate}`);
      if (response.ok) {
        const car = await response.json();
        setSearchResult(car);
        setSuccessMessage('Auto encontrado con éxito');
        setError('');
      } else {
        setSearchResult(null);
        setError('No se encontró ningún auto con esa placa');
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  const handleDeleteCar = async (licencePlate) => {
    try {
      const response = await fetch(`http://localhost:8080/cars/${licencePlate}`, {
        method: 'DELETE',
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

  // Función que se ejecuta al hacer clic en el botón "Listar Autos"
  const handleListCars = () => {
    fetchCars(); // Llama a la función para obtener la lista de autos
  };

  return (
    <div>
      <h2>Lista de Autos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button onClick={handleListCars}>Listar Autos</button> {/* Botón para listar autos */}

      <ul>
        {cars.map((car) => (
          <li key={car.licencePlate}>
            {car.licencePlate} - {car.make} - {car.color}
            <button onClick={() => handleDeleteCar(car.licencePlate)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Buscar Auto por Placa</h3>
      <form onSubmit={handleSearchCar}>
        <input
          type="text"
          placeholder="Placa"
          value={searchPlate}
          onChange={(e) => setSearchPlate(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>
      {searchResult && (
        <div>
          <h4>Resultado de Búsqueda:</h4>
          <p>
            Placa: {searchResult.licencePlate} - Modelo: {searchResult.make} - Color: {searchResult.color}
          </p>
        </div>
      )}

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
