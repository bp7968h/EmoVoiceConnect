// import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = window.localStorage.getItem("token") || null

    if (!token) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoute
