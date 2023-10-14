import React, { useContext, useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../Api'
import { UserContext } from '../../context/UserContext'
import Loading from '../../components/Loading/loading'
import { Alert } from 'react-bootstrap'

export default function Login() {

    const navigate = useNavigate()

    const [error, setError] = useState({
        error: false,
        message: ''
    })

    const [isLoading, setIsLoading] = useState(false);

    const userContext = useContext(UserContext);
    const setUser = userContext.setUser;

    const login = async (event)=>{
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await instance.post('/api/auth/inicioSesion',{
                email:event.target.email.value,
                password:event.target.password.value
            })

            setUser({
                logged:true,
                data: response.data.data
            })
            localStorage.setItem('token', response.data.tokenCreated )
            if(response){
                if(response.data.data.role === "VENDEDOR"){
                    return navigate('/vendedor/dashboard');
                }else{
                    return navigate('/home');
                }
            }
        } catch (error) {
            setError({
                error: true,
                message: error.response.data.message
            })
        }
        finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="parent clearfix">
        <div className="bg-illustration">
        <dotlottie-player src="https://lottie.host/1ccd2fc1-9b77-4cb1-b84c-9682de5d57d5/wWU1Iu9oGE.json" background={"transparent"} speed={"1"} className='img' loop autoplay></dotlottie-player>
        </div>
        <div className="login">
            <div className="container">
                <h1>Inicia sesion</h1>
                <p>No tienes una cuenta? <Link to='/register'>Registrarme</Link></p>
                <p>Quieres vender tus productos? <Link to='/vendedor/register'>Registrate acá</Link></p>
                <p>Olvidaste tu contraseña? <Link to='/recovery'>Recuperala acá</Link></p>
                <div className="login-form">
                    <form action="" onSubmit={login}>
                        <input type="email" name="email" id="email" placeholder='Correo Electronico' />
                        <input type="password" name="password" id="password" placeholder='Contraseña' />

                        <button className='btnLogin' disabled={isLoading}>{isLoading ? <Loading /> : "Iniciar sesion"}</button>
                    </form>
                    {error.error && <Alert style={{width: '100%', marginTop: '20px', color: 'gray'}} variant="danger">{error.message}</Alert>}
                </div>
            </div>
        </div>
    </div>
  )
}