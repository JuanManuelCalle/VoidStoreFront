import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function UserData() {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  console.log(user);
  return (
    <div>
        Logged: {user.logged?user.data.data.name : 'Not logged'}
    </div>
  )
}