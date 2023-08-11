import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

function Profile() {

  const [auth, setAuth] = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  

 useEffect(()=>{
  const {name, email, phone, address} = auth.user;
  setName(name);
  setEmail(email)
  setPhone(phone)
  setAddress(address)
 }, [auth?.user])

  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.put("http://localhost:8080/api/v1/auth/profile", {name, email, password, phone, address})
        if(data?.error){
          toast.error(data?.error)
        }
        else{
          setAuth({...auth, user:data.updatedUser})
          let ls = localStorage.getItem('auth')
          ls = JSON.parse(ls)
          ls.user = data.updatedUser
          localStorage.setItem('auth', JSON.stringify(ls))
          toast.success("profile updated successfully")
        }
    } catch (error) {
        console.log(error)
        toast.error("something wents wrong")
    }
}



  return (
    <Layout>
    <div className='row'>
      <div className='col-md-3'>
          <Usermenu/>
      </div>
      <div className='col-md-9'>
      <h1> User Profile </h1> 

      <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                        <input type="Email" className="form-control" id="exampleInputEmail" value={email}  onClick={()=>{toast.error("sorry you are not allowed to change the email")}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="exampleInputPhone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password'/>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
      </div>
    </div>
</Layout>
  )
}

export default Profile