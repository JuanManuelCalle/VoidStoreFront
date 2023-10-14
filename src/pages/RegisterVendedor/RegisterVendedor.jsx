import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../Api';
import Loading from '../../components/Loading/loading';
import { Alert } from 'react-bootstrap';

function RegisterVendedor() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    error: false,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const register = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const lastName = event.target.lastname.value;
    const name_store = event.target.name_store.value;

    if (!email || !password || !name || !lastName || !name_store) {
      setError({
        error: true,
        message: 'Todos los campos son obligatorios',
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
        email,
        password,
        name,
        lastName,
        passwordRecoveryCode: null,
        role: 'VENDEDOR',
        name_store,
      });

      if (response) {
        return navigate('/');
      }
    } catch (error) {
      setError({
        error: true,
        message: error.message || 'Hubo un error al registrar',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="parent clearfix">
      <div className="bg-illustration">
        <dotlottie-player src="https://lottie.host/0a114557-5244-466f-be81-56bc6f5ae6f1/g9QbrcIbEt.json" background={"transparent"} speed={"1"} className='img' loop autoplay></dotlottie-player>
      </div>
      <div className="login">
        <div className="container">
          <h1>Comienza tu negocio</h1>
          <p>Tienes una cuenta? <Link to='/'>Iniciar sesion</Link></p>
          <div className="login-form">
            <form action="" onSubmit={register}>
              <input type="text" name="name_store" id="name_store" placeholder='Nombre de la tienda' />
              <input type="text" name="name" id="name" placeholder='Nombre' />
              <input type="text" name="lastname" id="lastname" placeholder='Apellido' />
              <input type="email" name="email" id="email" placeholder='Correo Electronico' />
              <input type="password" name="password" id="password" placeholder='Contraseña' />
              <button className='btnLogin'>{isLoading ? <Loading /> : "Registrarme"}</button>
            </form>
            {error.error && <Alert style={{ width: '100%', marginTop: '20px', color: 'gray' }} variant="danger">{error.message}</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterVendedor;
