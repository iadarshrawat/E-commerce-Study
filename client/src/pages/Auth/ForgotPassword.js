import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';


function ForgotPassword() {

  const [email, setEmail] = useState('')
  const [answer, setAnswer] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/forgotPassword", { email, answer ,newPassword })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("something wents wrong")
        }
    
  }

  return (
    <Layout>
      <div className='register'>
        <h1>Forgot Password Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
            <input type="Email" className="form-control" id="exampleInputEmail" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAnswer" className="form-label">Where is your first school</label>
            <input type="text" className="form-control" id="exampleInputAnswer" value={answer} onChange={(e) => { setAnswer(e.target.value) }} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputNewPassword1" className="form-label">New Password</label>
            <input type="password" className="form-control" id="exampleInputNewPassword1" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword