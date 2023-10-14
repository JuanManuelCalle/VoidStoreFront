import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PageNotFound = () => {
  const {user} = useContext(UserContext)
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">404: Page Not Found</h4>
              <dotlottie-player src="https://lottie.host/493180ab-f2c2-4ed6-ac0f-78cc411298eb/UkSeZFhaX9.json" background="transparent" speed="1" style={{height: '600px'}} loop autoplay></dotlottie-player>
              <Link to={user.logged ? "/home" : "/"} className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Ir atras
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
