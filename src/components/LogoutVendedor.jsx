import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";


function LogoutVendedor({name}) {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem('token');
        setUser({
            logged: false,
            data: {}
        })
        navigate('/')
    }
  return (
    <div onClick={logout} style={{cursor: 'pointer'}}>
      <FaSignOutAlt className={name} style={{color: 'white'}}/>
      <span style={{color: 'white', marginLeft: '15px'}} className="nav_name">Cerrar sesion</span>
    </div>
    
  )
}

export default LogoutVendedor