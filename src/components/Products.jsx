import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import instance from "../Api";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: ""
  });
  const [products, setProducts] = useState([]); // Estado para los productos de la otra API

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Primero, realiza la solicitud a la API con Axios
        const axiosResponse = await instance.get(`/api/producto/getAll`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });

        // Actualiza el estado con los datos de Axios
        setProducts(axiosResponse.data.data);

        // Actualiza el estado con los datos de fetch
        setData(axiosResponse.data.data);
        setFilter(axiosResponse.data.data);
      } catch (error) {
        setError({
          error: true,
          message: error.response.data.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Todos los Productos</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? (
            <Loading />
          ) : (
            filter.map((product) => (
              <div id={product._id} key={product._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                <div className="card text-center h-100" key={product._id}>
                  <img
                    className="card-img-top p-3"
                    src={product.image}
                    alt="Card"
                    height={400}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.name}
                    </h5>
                    <p className="card-text">
                      {product.descripcion}
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {product.precio}</li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/product/" + product._id} className="btn m-1" style={{background: '#8b34d2', color: 'white'}}>
                      Ver producto
                    </Link>
                    <button className="btn m-1" style={{background: '#8b34d2', color: 'white'}} onClick={() => addProduct(product)}>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
