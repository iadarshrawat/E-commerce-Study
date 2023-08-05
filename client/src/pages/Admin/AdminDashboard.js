import React from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import  {useAuth}  from '../../context/auth'

function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <Adminmenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1>Admin Name :{auth?.user?.name}</h1>
              <h1>Admin Email :{auth?.user?.email}</h1>
              <h1>Admin Contact :{auth?.user?.phone}</h1>
              <h1>Admin Address :{auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>


    </Layout>
  )
}

export default AdminDashboard