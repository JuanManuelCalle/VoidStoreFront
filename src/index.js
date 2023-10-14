import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


import { Home, Product, Products, AboutPage, ContactPage, Cart, Checkout, PageNotFound } from "./pages"
import Login from './pages/Login/Login';
import Registro from './pages/Registrar/Registro';
import UserProvider from './context/UserContext';
import RegisterVendedor from './pages/RegisterVendedor/RegisterVendedor';
import Dashboard from './pages/Dashboard/dashboard'
import Prfofile from './pages/Profile/profile';
import AddNew from './pages/AddNew/addNew';
import Editar from './pages/Editar/editar';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import PayCompleted from './pages/PayCompleted';
import UserProfile from './pages/UserProfile/UserProfile';
import OrdenDetail from './pages/OrdenDetail/OrdenDetail';
import RecoveryPassword from './pages/RecoveryPassword/RecoveryPassword';
import ChangePassoword from './pages/ChangePassoword/changePassword';
import EditarProfile from './pages/EditarProfile/EditarProfile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            {/* Login Register Recovery */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registro />} /> 
            <Route path="/recovery" element={<RecoveryPassword />} />
            <Route path="/changePassword" element={<ChangePassoword />} />

            {/* Tienda */}
            <Route path="/product" element={<PrivateRoute children={<Products />} />} />
            <Route path="/product/:id" element={<PrivateRoute children={<Product/>} />} />
            <Route path="/about" element={<PrivateRoute children={<AboutPage/>} />} />
            <Route path="/contact" element={<PrivateRoute children={<ContactPage />} />} />
            <Route path="/cart" element={<PrivateRoute children={<Cart />} />} />
            <Route path="/home" element={<PrivateRoute children={<Home />} />} />
            <Route path="/checkout" element={<PrivateRoute children={<Checkout />} />} />
            <Route path="/orderCompleted" element={<PrivateRoute children={<PayCompleted />} />} />
            <Route path='/perfil' element={<PrivateRoute children={<UserProfile />} />} />
            <Route path='/perfil/edit' element={<PrivateRoute children={<EditarProfile />} />} />
            <Route path='/pedido/:id' element={<PrivateRoute children={<OrdenDetail />} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/*" element={<PageNotFound />} />

            {/* Routes de vendedores */} 
            <Route path="/vendedor/register" element={<RegisterVendedor />} />
            <Route path='/vendedor/dashboard' element={<ProtectedRoute allowedRoles={["VENDEDOR"]}>
              <Dashboard />
            </ProtectedRoute>} />
            <Route path='/vendedor/perfil' element={<ProtectedRoute allowedRoles={["VENDEDOR"]}>
              <Prfofile />
            </ProtectedRoute>} />
            <Route path='/vendedor/addNew' element={<ProtectedRoute allowedRoles={["VENDEDOR"]}>
              <AddNew />
            </ProtectedRoute>} />
            <Route path='/vendedor/editar/:id' element={<ProtectedRoute allowedRoles={["VENDEDOR"]}>
              <Editar />
            </ProtectedRoute>} /> 
          </Routes>
        </Provider>
      </BrowserRouter>
  </UserProvider>
);