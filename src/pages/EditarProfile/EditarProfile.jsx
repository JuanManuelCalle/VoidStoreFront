import React, {useState } from 'react';
import './style.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {  useParams } from 'react-router-dom';
import instance from '../../Api';
import Loading from '../../components/Loading/loading';
import Swal from 'sweetalert2';
import { Navbar } from '../../components';
import Footer from '../../components/footer/Footer';

function EditarProfile() {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [editedUser, setEditedUser] = useState({
    name: user.data.name,
    lastname: user.data.lastName,
    email: user.data.email,
    id: user.data._id
  });

  const [error, setError] = useState({
    error: true,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const EditarProducto = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await instance.post(`/api/auth/updateUser`, {
          name: editedUser.name,
          lastName: editedUser.lastname,
          email: editedUser.email,
          id: editedUser.id
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      if (response) {
        const newUser = {
          ...user,
          data: {
            ...user.data,
            name: editedUser.name,
            lastName: editedUser.lastname,
            email: editedUser.email
          }
        }
        setUser(newUser)
        Swal.fire(
          '',
          'Usuario fue editado correctamente',
          'success'
        )
      }
    } catch (error) {
      setError({
        error: true,
        message: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar />
      <div className="containerAddNew">
        <div className="new-product-form">
          <h2>Editar perfil</h2>
          <form onSubmit={EditarProducto}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Apellidos</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={editedUser.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </div>
            <button className="btnCreate" disabled={isLoading}>
              {isLoading ? <Loading /> : 'Editar'}
            </button>
            {error.error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EditarProfile;
