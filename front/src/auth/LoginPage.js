import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Intentando iniciar sesión con usuario: ${username} y contraseña: ${password}`);
    
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const token = await response.text(); // El backend devuelve el token como texto
        localStorage.setItem('token', token); // Guardar token en localStorage
        alert('Login exitoso');
        
        navigate('/'); // Cambia la ruta según lo necesites
      } else {
        const errorText = await response.text(); // Capturar el texto del error
        console.log(`Error de respuesta: ${errorText}`);
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error(`Error de conexión: ${error.message}`);
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginPage;
