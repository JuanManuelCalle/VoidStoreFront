import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../Api'
import Loading from '../../components/Loading/loading'
import Alert from 'react-bootstrap/Alert';

export default function ChangePassoword() {

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
            const response = await instance.post('/api/auth/change_passoword',{
                code:event.target.code.value,
                newPassoword:event.target.newPassoword.value,
            })

            if(response){
                return navigate('/');
            }
        } catch (error) {
            console.log(error);
            setError({
                error:true,
                message: error
            })
        }
        finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="parent clearfix">
        <div className="bg-illustration">
        <dotlottie-player src="https://lottie.host/7d6792ca-cd99-41c3-a132-a33f63c20d27/YkgSd5SlwK.json" background={"transparent"} speed={"1"} className='img' loop autoplay></dotlottie-player>
        </div>
        <div className="login">
            <div className="container">
                <h1>Recuperar contraseña</h1>
                <p><Link to='/'>Inicio</Link></p>
                <div className="login-form">
                    <form action="" onSubmit={SendEmailRecovery}>
                        <input type="text" name="code" id="code" placeholder='Codigo' />
                        <input type='password' name="newPassoword" id='newPassoword' placeholder='Nueva contraseña' />

                        <button className='btnLogin' disabled={isLoading}>{isLoading ? <Loading /> : "Cambiar contraseña"}</button>
                    </form>
                    {error.error && <Alert style={{width: '100%', marginTop: '20px', color: 'gray'}} variant="danger">{error.message.message}</Alert>}
                </div>
            </div>
        </div>
    </div>
  )
}