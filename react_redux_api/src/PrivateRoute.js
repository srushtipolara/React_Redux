import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [])

    return <Component {...rest} />
}

export default PrivateRoute