import React from 'react'
import './style.css'
import NavBardashboard from '../../components/NavbarDashboard/navbarDashboard'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import instance from '../../Api'
import Loading from '../../components/Loading/loading'
import Swal from 'sweetalert2'


function AddNew() {

    const [error, setError] = useState({
        error:true,
        message: ''
    })

    const [isLoading, setIsLoading] = useState(false);

    const {user} = useContext(UserContext)

    const NewProducto = async (event)=>{
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await instance.post('/api/producto/create', {
                name: event.target.name.value,
                descripcion: event.target.description.value,
                precio: event.target.price.value,
                stok: event.target.stock.value,
                id_vendedor: user.data._id,
                image: event.target.img.value
              }, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
                }
              });

              if(response){
                Swal.fire(
                  '',
                  'Producto agregado correctamente',
                  'success'
                ).then(() => {
                  window.location.reload();
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

    const form = (
        <div className="containerAddNew">
        <div className="new-product-form">
          <h2>Crear un Nuevo Producto</h2>
          <form onSubmit={NewProducto}>
            <div className="form-group">
              <label htmlFor="name">Nombre del Producto</label>
              <input
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio del Producto</label>
              <input
                type="number"
                id="price"
                name="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock del producto</label>
              <input
                type="number"
                id="stock"
                name="stock"
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Imagen del producto</label>
              <input
                type="text"
                id="img"
                name="img"
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">Descripción del Producto</label>
              <textarea
                rows="4"
                id="description"
                name="description"
              ></textarea>
            </div>
            <button className='btnCreate' disabled={isLoading} >{isLoading ? <Loading /> : "Crear Producto"}</button> 
            {error.error&&<p>{error.message}</p>}
          </form>
        </div>
      </div>
    )
  return (
    <NavBardashboard mainContent={form} />
  )
}

export default AddNew