import React from "react";
import './style.css'

const Main = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid h95"
            src="https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Card"
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Nuevas llegadas de la temporada</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                Descubre nuestras recientes adquisiciones de la temporada <br />
                Esta tarjeta más amplia ofrece información complementaria 
                a continuación <br /> y actúa como una introducción
                natural a contenidos adicionales.<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
