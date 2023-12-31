import React from 'react'
import Layout from '../../components/Layout/Layout'
import  {useAuth}  from '../../context/auth'
import Usermenu from '../../components/Layout/Usermenu';

function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <Usermenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1>User Name :{auth?.user?.name}</h1>
              <h1>User Email :{auth?.user?.email}</h1>
              <h1>User Contact :{auth?.user?.phone}</h1>
              <h1>User Address :{auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>


    </Layout>
  )
}

export default Dashboard