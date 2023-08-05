import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/auth/adminAuth');
                console.log(res)
                if (res.data.ok) {
                    setOk(true)
                }
                else {
                    setOk(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        console.log(auth.token)
        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path="page-not-found" />
}

export default AdminRoute;