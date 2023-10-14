import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NavLink } from 'react-router-dom';

function Logout() {
    const {setUser} = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem('token');
        setUser({
            logged: false,
            data: {}
        })
    }
  return (
    <li className="nav-item">
        <button onClick={logout} style={{border: 'none', background: 'transparent'}}>
            <NavLink className="nav-link" to="/">Logout</NavLink>
        </button>
    </li>
  )
}

export default Logout