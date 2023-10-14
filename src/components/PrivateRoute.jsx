import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'
import Loading from './Loading/loading'

export default function PrivateRoute({children}) {
    const {user} = useContext(UserContext)
    if(user.fetching){
        return <Loading />
    }else if(!user.logged){
        return <Navigate to="/" replace/>
    }
    
    return children
}