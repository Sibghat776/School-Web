import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const Admin = JSON.parse(localStorage.getItem("admin"))
    console.log(Admin)
    return (
        Admin ? <Outlet /> : <Navigate to={"/adminLogin"} />
    )
}

export default AdminRoutes