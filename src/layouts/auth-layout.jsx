import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden ">
        <Outlet/>
    </div>
  )
}

export default AuthLayout