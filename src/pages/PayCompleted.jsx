import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import instance from "../Api";
import { useEffect } from "react";

const PayCompleted = () => {
  const {user} = useContext(UserContext)

  const state = useSelector((state) => state.handleCart);

  const location = useLocation();

  const totalCompra = location.state.totalCompra 

  const dispatch = useDispatch();

  //dispatch({type: "CLEANCART"})

  const productos = state.map((item) => ({
    name: item.name,
    qty: item.qty
  }))

  const saveOrder = async () =>{
    const response = await instance.post('/api/orden/create', {
      total: totalCompra,
      productos: productos,
      idUsuario: user.data._id

    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    if(response){
      const productos = state.map((item) => ({
        idProducto: item._id,
        qty: item.qty
      }))

      const responseUpdateStock = await instance.post('/api/producto/updatestock', {
        productos: productos
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      if(responseUpdateStock){
        dispatch({type: "CLEANCART"})
      }
    }
  }

  useEffect(() => {
    if (location.state.isCompra) {
      saveOrder();
    }
  }, [location.state.isCompra]);


  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">Gracias por tu compra! </h4>
              <dotlottie-player src="https://lottie.host/58097ca0-de6e-4928-a5b7-3522e95a592e/0BuCl7r9GE.json" background="transparent" speed="1" style={{height: '300px'}} loop autoplay></dotlottie-player>
                <Link to="/home" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Ir a inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayCompleted;