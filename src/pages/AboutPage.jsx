import React from 'react'
import Footer from '../components/footer/Footer';
import Navbar from '../components/Navbar';
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Sobre Nosotros</h1>
        <hr />
        <p className="lead text-center">
        "Bienvenido a VoidStore, tu destino para la moda. En VoidStore, te ofrecemos una amplia selección de ropa y accesorios de moda para todas las ocasiones, desde ropa casual hasta elegantes accesorios. Nuestra misión es proporcionarte una experiencia de compra en línea excepcional, ofreciendo productos de alta calidad y las últimas tendencias. Además, si eres un vendedor de moda, puedes unirte a nuestra plataforma para administrar tus productos y llegar a una amplia audiencia de compradores. Únete a nuestra comunidad y mantente al día con las últimas tendencias y ofertas exclusivas. ¡Gracias por elegir VoidStore como tu destino de moda en línea!"
        </p>

        <h2 className="text-center py-4">Nuestros Productos</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Ropa para Hombre</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Ropa de Mujer</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage