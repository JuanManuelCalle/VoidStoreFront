import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar";
import instance from "../Api";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const ObtenerUnProducto = async () => {
      setLoading(true);

      try {
        const response = await instance.get(`/api/producto/getOne/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });

        if (response.data) {
          setProduct(response.data.data);
        }
      } catch (error) {
        setError({
          error: true,
          message: error.response.data.message
        });
      } finally {
        setLoading(false);
      }
    };

    ObtenerUnProducto();
  }, [id]);



  const Loading = () => {

    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product[0]?.image}
                alt={product[0]?.name}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h1 className="display-5">{product[0]?.name}</h1>
              <h3 className="display-6  my-4">${product[0]?.precio}</h3>
              <p className="lead">{product[0]?.descripcion}</p>
              <button
                className="btn" style={{background: '#8b34d2', color: 'white'}}
                onClick={() => addProduct(product)}
              >
                Agregar al carrito
              </button>
              <Link to="/cart" className="btn mx-3" style={{background: '#8b34d2', color: 'white'}}>
                Ir al carrito
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const addProduct = (product) => {
    console.log(product);
    dispatch(addCart(product[0]));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
