import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../Api'
import Loading from '../../components/Loading/loading'
import { Alert } from 'react-bootstrap'

export default function RecoveryPassword() {

    const navigate = useNavigate()

    const [error, setError] = useState({
        error: false,
        message: ''
    })

    const [isLoading, setIsLoading] = useState(false);

    const SendEmailRecovery = async (event)=>{
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await instance.post('/api/auth/recoverPassword',{
                email:event.target.email.value,
            })

            if(response){
                return navigate('/changePassword');
            }
        } catch (error) {
            setError({
                error:true,
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
        <dotlottie-player src="https://lottie.host/85c2e3ba-cbca-4269-a4ec-9f9b82e0d05f/Z6yNwFDjQ9.json" background={"transparent"} speed={"1"} className='img' loop autoplay></dotlottie-player>
        </div>
        <div className="login">
            <div className="container">
                <h1>Recuperar contraseña</h1>
                <p><Link to='/'>Inicio</Link></p>
                <div className="login-form">
                    <form action="" onSubmit={SendEmailRecovery}>
                        <input type="email" name="email" id="email" placeholder='Correo Electronico' />

                        <button className='btnLogin' disabled={isLoading}>{isLoading ? <Loading /> : "Recuperar contraseña"}</button>
                    </form>
                    {error.error && <Alert style={{width: '100%', marginTop: '20px', color: 'gray'}} variant="danger">{error.message}</Alert>}
                </div>
            </div>
        </div>
    </div>
  )
}