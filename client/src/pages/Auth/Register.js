import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", {name, email, password, phone, address})
            if(res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
            else{
                console.log(res.data.message)
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something wents wrong")
        }
    }

    return (
        <Layout>
            <div className='register'>
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input type="Email" className="form-control" id="exampleInputEmail" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="exampleInputPhone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register