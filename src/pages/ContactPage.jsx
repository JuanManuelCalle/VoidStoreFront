import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contactanos</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">Nombre</label>
                <input
                  type="email"
                  class="form-control"
                  id="Name"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div class="form my-3">
                <label for="Email">Correo</label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Mensaje</label>
                <textarea
                  rows={5}
                  class="form-control"
                  id="Password"
                  placeholder="Ingresa tu mensaje"
                />
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;