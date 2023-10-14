import React, { useContext } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTable, 
  MDBTableHead, 
  MDBTableBody
} from 'mdb-react-ui-kit';
import { Navbar } from '../../components';
import Footer from '../../components/footer/Footer';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import instance from '../../Api';
import { useEffect } from 'react';
import { FaEdit} from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function UserProfile() {

const {user} = useContext(UserContext)
const [pedidos, SetPedidos] = useState("")
const navigate = useNavigate();

const getOrdersUser = async () => {
  try {
    const response = await instance.get(`/api/orden/get/${user.data._id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

    if(response){
      SetPedidos(response.data.data)
    }

  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getOrdersUser();
}, [])

const handlePedidos = (item,pedidos) => {
  return navigate(`/pedido/${item._id}`, {state: {pedidos: pedidos}})
}

  return (
    <section style={{ backgroundColor: '#eee' }}>
    <Navbar />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
              </MDBCardBody>
              <Button className='btn btn-success' onClick={() => navigate('/perfil/edit')}>Editar perfil</Button>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nombres</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.data?.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Apellidos</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.data?.lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Correo Eléctronico</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.data?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
              <MDBTable hover>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Total Compra</th>
                            <th scope='col'>Acciones</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {pedidos.length > 0 ? (
                        pedidos.map((item) => (
                          <tr key={item._id}>
                            <td>{item?._id}</td>
                            <td>{item?.total}</td>
                            <td>
                            <Button className='btn btn-warning' onClick={() => handlePedidos(item, pedidos)} style={{ marginRight: '10px' }}>
                                <FaEdit style={{ fontSize: '20', color: 'white' }} />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">Cargando pedidos...</td>
                        </tr>
                      )}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </section>
  );
}