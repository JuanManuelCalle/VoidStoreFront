import React, { createContext, useEffect, useState } from 'react'
import instance from '../Api';

export const VendedorContext = createContext();

export default function VendedorProvider({children}) {

    const [vendedor, setVendedor] = useState({
        logged: false,
        data: {}
    })

    useEffect(() => {
        instance.get('/api/auth/recover', {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('tokenVendedor')
            }
        })
        .then((response) => {
            setVendedor({
                logged: true,
                data: response.data
            })
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])


  return (
    <VendedorContext.Provider value={{vendedor, setVendedor}}>
        {children}
    </VendedorContext.Provider>
  )
}