// import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = true

    if (!token) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default ProtectedRoute
