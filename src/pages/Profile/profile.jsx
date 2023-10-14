import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './style.css'
import NavBardashboard from '../../components/NavbarDashboard/navbarDashboard';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


export default function Prfofile() {
  const {user} = useContext(UserContext)

    const mainContent = (
        <div className="profile-container">
      <Container>
        <Row className="mt-5">
          <Col md={4}>
            <Image
              src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile Picture"
              roundedCircle
              fluid
            />
          </Col>
          <Col md={8}>
            <h2>{user.data?.name}</h2>
            <p>Correo Electrónico: {user.data?.email}</p>
            <p>Nombre de la tienda: {user.data?.name_store}</p>
            <Button variant="primary">Editar Perfil</Button>
          </Col>
        </Row>
      </Container>
    </div>
    )
  return (
    <NavBardashboard mainContent={mainContent} />
  );
}