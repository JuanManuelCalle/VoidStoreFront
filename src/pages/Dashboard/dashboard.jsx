import React from 'react'
import NavBardashboard from '../../components/NavbarDashboard/navbarDashboard'
import { Container, Table, Button, Modal, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import instance from '../../Api';
import { useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

function Dashboard() {
  const navigate = useNavigate();

    const [products, setProducts] = useState([]);

      
    const [error, setError] = useState({
      error:true,
      message: ''
  })

  const [isLoading, setIsLoading] = useState(false);

  const {user} = useContext(UserContext)


  const getProductos = async (event)=>{
      setIsLoading(true)
      try {
          const response = await instance.get(`/api/producto/get/${user.data._id}`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            });

            if(response){
              setProducts(response.data.data)
            }

      } catch (error) {
          setError({
              error:true,
              message: error.response.data.message
          })
      }
      finally {
          setIsLoading(false)
      }
  }

      const addNew = () => {
        return navigate('/vendedor/addNew')
      }

      const deleteProducto = async (id) => {
        setIsLoading(true)
          try {
              const response = await instance.delete(`/api/producto/delete/${id}`, {
                  headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                  }
                });

                if(response){
                  Swal.fire({
                    title: 'Producto eliminado correactamente',
                    confirmButtonText: 'Aceptar',
                    icon: 'success'
                  })
                  .then((result) => {
                    if(result.isConfirmed){
                      window.location.reload();
                    }
                  })
                }
    
          } catch (error) {
              setError({
                  error:true,
                  message: error.response.data.message
              })
          }
          finally {
              setIsLoading(false)
          }
      }

      const confirmSwal = (id) => {
        Swal.fire({
          title: 'Quieres eliminar este producto?',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        })
        .then((result) => {
          if(result.isConfirmed){
            deleteProducto(id);
          }
        })
      }

      useEffect(() => {
        getProductos();
      }, [user.data._id])

    const tableProductos = (
        <Container>
      <div className="mt-4">
        <h2>Lista de Productos</h2>
        <Button variant="success" onClick={addNew}>
          Agregar Producto
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.precio}</td>
              <td>{product.stok}</td>
              <td>{product.image ? "Imagen guardada" : "No Subio imagen"}</td>
              <td>
                <Button className='btn btn-warning' style={{marginRight: '10px'}} onClick={() => navigate(`/vendedor/editar/${product._id}`)}>{isLoading ? <Spinner animation="border" style={{fontSize: "10px", color: 'white'}} /> : <FaEdit style={{fontSize: '20', color: 'white'}} />}</Button>
                <Button className='btn btn-danger' onClick={() => confirmSwal(product._id)}>{isLoading ? <Spinner animation="border" style={{fontSize: "10px", color: 'white'}} /> : <FaTrash style={{fontSize: '20', color: 'white'}} />}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    );

    return (
      <>
      <NavBardashboard mainContent={tableProductos} />  
      </>
    )
}

export default Dashboard