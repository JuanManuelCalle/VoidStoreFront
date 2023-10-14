import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router'
import Loading from './Loading/loading'

export default function ProtectedRoute({children, allowedRoles}) {
    const {user} = useContext(UserContext)
    if(user.fetching){
        return <Loading />
    }else if(!allowedRoles.includes(user.data.role)){
        return <Navigate to="/home"/>
    }

    return children
}