import React from 'react'
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { setConnect, setToken } from '../../../store/admin-slice';
import Login from '../../../components/Admin/LoginAdmin/Login/Login';

const AdminLogin = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   const parseData = JSON.parse(data)
  //   if(parseData) {
  //     dispatch(setConnect(parseData.isConnect))
  //     dispatch(setToken({token:parseData.token}))
  //   }
  // }, []);
  return (
    <div>
        <Login/>
    </div>
  )
}

export default AdminLogin