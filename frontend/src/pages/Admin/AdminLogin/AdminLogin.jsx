import React from 'react'
import { useEffect } from 'react';
import { setConnect, setToken } from '../../../store/admin-slice';
import Login from '../../../components/Admin/LoginAdmin/Login/Login';

const AdminLogin = ({setAdminToken}) => {
  return (
    <div>
        <Login setAdminToken={setAdminToken}/>
    </div>
  )
}

export default AdminLogin