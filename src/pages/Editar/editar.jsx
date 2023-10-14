import React, { useEffect, useState } from 'react';
import './style.css';
import NavBardashboard from '../../components/NavbarDashboard/navbarDashboard';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../Api';
import Loading from '../../components/Loading/loading';
import Swal from 'sweetalert2';

function Editar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [editedProduct, setEditedProduct] = useState({
    name: '',
    precio: '',
    stok: '',
    image: '',
    descripcion: '',
  });

  const [error, setError] = useState({
    error: true,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  useEffect(() => {
    const ObtenerUnProducto = async () => {
      try {
        const response = await instance.get(`/api/producto/getOne/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (response.data) {
          setProduct(response.data.data);
          setEditedProduct({
            name: response.data.data[0]?.name,
            precio: response.data.data[0]?.precio.toString(),
            stok: response.data.data[0]?.stok.toString(),
            image: response.data.data[0]?.image,
            descripcion: response.data.data[0]?.descripcion,
          });
        }
      } catch (error) {
        setError({
          error: true,
          message: error.response.data.message,
        });
      }
    };

    ObtenerUnProducto();
  }, [id]);

  const EditarProducto = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await instance.put(`/api/producto/update/${id}`, {
          name: editedProduct.name,
          precio: editedProduct.precio,
          stok: editedProduct.stok,
          image: editedProduct.image,
          descripcion: editedProduct.descripcion,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      if (response) {
        Swal.fire(
          '',
          'Producto fue editado correctamente',
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

  const form = (
    <div className="containerAddNew">
      <div className="new-product-form">
        <h2>Editar un Producto</h2>
        <form onSubmit={EditarProducto}>
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio del Producto</label>
            <input
              type="number"
              id="price"
              name="precio"
              value={editedProduct.precio}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock del producto</label>
            <input
              type="number"
              id="stock"
              name="stok"
              value={editedProduct.stok}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Imagen del producto</label>
            <input
              type="text"
              id="img"
              name="image"
              value={editedProduct.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">Descripción del Producto</label>
            <textarea
              rows="4"
              id="description"
              name="descripcion"
              value={editedProduct.descripcion}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button className="btnCreate" disabled={isLoading}>
            {isLoading ? <Loading /> : 'Editar'}
          </button>
          {error.error && <p>{error.message}</p>}
        </form>
      </div>
    </div>
  );

  return <NavBardashboard mainContent={form} />;
}

export default Editar;
