import { useLocation, useParams } from 'react-router-dom';
import { Navbar } from '../../components';
import Footer from '../../components/footer/Footer';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';

function OrdenDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { pedidos } = location.state;
  const pedido = pedidos.find((p) => p._id === id);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md={12}>
            <h2>Detalles del Pedido:</h2>
            <Card>
              <Card.Body>
                <Card.Text>Id de la orden: {pedido._id}</Card.Text>
                <Card.Text>Total pedido: {pedido.total}</Card.Text>
                <Card.Title>Productos:</Card.Title>
                <Table striped bordered hover style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Nombre del Producto</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedido.productos.map((producto) => (
                      <tr key={producto._id}>
                        <td>{producto.name}</td>
                        <td>{producto.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default OrdenDetail;
