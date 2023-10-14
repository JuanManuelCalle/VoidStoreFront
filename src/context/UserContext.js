import React, { createContext, useEffect, useState } from 'react'
import instance from '../Api';

export const UserContext = createContext();

export default function UserProvider({children}) {

    const [user, setUser] = useState({
        logged: false,
        data: {},
        fetching: true
    })

    useEffect(() => {
        instance.get('/api/auth/recover', {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token')
            }
        })
        .then((response) => {
            setUser({
                logged: true,
                data: response.data.data,
                fetching: false
            })
        }).catch((error) => {
            console.log(error);
            setUser({
                logged: false,
                data: {},
                fetching: false
            })
        })
    }, [])


  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}