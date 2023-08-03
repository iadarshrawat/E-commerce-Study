import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';


    function Login() {
        
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();
        const [auth, setAuth] = useAuth();

        const handleSubmit = async (e)=> {
            e.preventDefault();
            try {
                const res = await axios.post("http://localhost:8080/api/v1/auth/login", {email, password})
                if(res.data.success) {
                    toast.success(res.data.message)
                    setAuth({
                        ...auth,
                        user:res.data.user,
                        token:res.data.token,
                    })
                    localStorage.setItem('auth', JSON.stringify(res.data))
                    navigate('/')
                }
                else{
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error("something wents wrong")
            }
        }

        return (
            <Layout>
                <div className='register'>
                    <h1>LogIn Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                            <input type="Email" className="form-control" id="exampleInputEmail" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </Layout>
        )
    }

export default Login