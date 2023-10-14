import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css';
import Logout from '../Logout';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const {user} = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> VoidStore</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {user.logged ? (
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">Sobre nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contactanos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/perfil">{user.logged ? user.data?.name : "Perfil"}</NavLink>
                        </li>
                        <Logout />
                    </ul>
                    ) : (
                        <ul className="navbar-nav m-auto my-2 text-center">
                        </ul>
                    )}
                    <div className="buttons text-center">
                        
                        <>
                            {user.logged ? (
                                <></>
                            ) : (
                                <>
                                    <NavLink to="/" className="btn btn_navbar m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                    <NavLink to="/register" className="btn btn_navbar m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                                </>
                            )}
                        </>

                        <NavLink to="/cart" className="btn btn_navbar m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar