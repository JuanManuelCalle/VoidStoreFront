import React, { useContext } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './style.css'
import './app.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars, FaUser, FaBoxes, FaSignOutAlt, FaSpaceShuttle } from "react-icons/fa";
import LogoutVendedor from '../LogoutVendedor';
import { UserContext } from '../../context/UserContext';

function NavBardashboard({mainContent}) {
  const {user} = useContext(UserContext)
  return (
    <div id="body-pd_dashboard" className='body_Dashboard'>
      <header className="header_dashboard" id="header">
        <div className="header_toggle_dashboard" id='header-toggle'>
          <FaBars />
        </div>
      </header>
      <Container fluid>
        <Row>
          {/* Barra lateral */}
          <Col md={3} lg={2} className="l-navbar" id="nav-bar">
            <nav className="nav">
              <div>
                <a href="/vendedor/dashboard" className="nav_logo">
                  <FaSpaceShuttle className='fs-20 cl-white' />
                  <span className="nav_logo-name">{user.data?.name_store}</span>
                </a>
                <div className="nav_list">
                  <a href="/vendedor/dashboard" className="nav_link_Dashboard active">
                    <FaBoxes className='fs-20' />
                    <span className="nav_name">Productos</span>
                  </a>
                  <a href="/vendedor/perfil" className="nav_link_Dashboard">
                    <FaUser className='fs-20'/>
                    <span className="nav_name">Perfil</span>
                  </a>
                  <a className="nav_link_Dashboard">
                      <LogoutVendedor name={'fs-20'} />
                  </a>
                  
                </div>
              </div>
              
            </nav>
          </Col>

          {/* Contenido principal */}
          <Col md={9} lg={10} className="height-100 div_main">
            {mainContent}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavBardashboard;