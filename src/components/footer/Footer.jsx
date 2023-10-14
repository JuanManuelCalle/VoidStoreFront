import React from 'react'
import './style.css'

function Footer() {
  return (
    <footer className="new_footer_area bg_color">
    <div className="new_footer_top">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="f_widget company_widget wow fadeInLeft style1" data-wow-delay={"0.2s"}>
              <h3 className="f-title f_600 t_color f_size_18">VoidStore</h3>
              <p>No te pierdas de nuestras ofertas! Suscribete</p>
              <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate={true}>
                <input type="text" name="EMAIL" className="form-control memail" placeholder="Correo Electronico" />
                <button className="btn btn_get btn_get_two" type="submit">Suscribirme</button>
                <p className="mchimp-errmessage" style={{ display: 'none' }}></p>
                <p className="mchimp-sucmessage" style={{ display: 'none' }}></p>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="f_widget about-widget pl_70 wow fadeInLeft style2" data-wow-delay="0.4s">
              <h3 className="f-title f_600 t_color f_size_18">Download</h3>
              <ul className="list-unstyled f_list">
                <li><a href="/home">Inicio</a></li>
                <li><a href="/product">Productos</a></li>
                <li><a href="/contact">Contactanos</a></li>
                <li><a href="/register">Registrarme</a></li>
                <li><a href="/about">Sobre nosotros</a></li>
                <li><a href='/'>¿Eres vendedor?</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="f_widget social-widget pl_70 wow fadeInLeft style4" data-wow-delay="0.8s">
              <h3 className="f-title f_600 t_color f_size_18">Siguenos en</h3>
              <div className="f_social_icon">
                <a href="#" className="fab fa-facebook"></a>
                <a href="#" className="fab fa-twitter"></a>
                <a href="#" className="fab fa-linkedin"></a>
                <a href="#" className="fab fa-pinterest"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bg">
        <div className="footer_bg_one"></div>
        <div className="footer_bg_two"></div>
      </div>
    </div>
    <div className="footer_bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-7">
            <p className="mb-0 f_400">© VoidStore.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer