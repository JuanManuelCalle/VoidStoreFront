import React from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import instance from '../../Api';
import Loading from '../../components/Loading/loading';
import { Alert } from 'react-bootstrap';

function Registro() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const register = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const name = event.target.name.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    
    if (!name || !lastname || !email || !password) {
      setError({
        error: true,
        message: 'Todos los campos son obligatorios.',
      });
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError({
        error: true,
        message: 'El formato del correo electrónico no es válido.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await instance.post('/api/auth/registro', {
        email: email,
        password: password,
        name: name,
        lastName: lastname,
        passwordRecoveryCode: null,
        name_store: null,
      });

      if (response) {
        return navigate('/');
      }
    } catch (error) {
      setError({
        error: true,
        message: error.toString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="parent clearfix">
      <div className="bg-illustration">
        <dotlottie-player src="https://lottie.host/09f758bc-bdf0-4a04-8d63-24c49133fbda/xS9ANnBxFp.json" background={"transparent"} speed={"1"} loop autoplay className='img'></dotlottie-player>
      </div>
      <div className="login">
        <div className="container">
          <h1>Registro</h1>
          <p>Tienes una cuenta? <Link to='/'>Iniciar sesion</Link></p>
          <div className="login-form">
            <form onSubmit={register}>
              <input type="text" name="name" id="name" placeholder='Nombre' />
              <input type="text" name="lastname" id="lastname" placeholder='Apellido' />
              <input type="email" name="email" id="email" placeholder='Correo Electronico' />
              <input type="password" name="password" id="password" placeholder='Contraseña' />

              <button className='btnLogin' disabled={isLoading}>{isLoading ? <Loading /> : "Iniciar aventura"}</button>
              {error.error && <Alert style={{ width: '100%', marginTop: '20px', color: 'gray' }} variant="danger">{error.message.toString()}</Alert>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
