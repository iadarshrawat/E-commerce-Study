import React from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'

function Orders() {
  return (
    <Layout>
    <div className='row'>
      <div className='col-md-3'>
          <Usermenu/>
      </div>
      <div className='col-md-9'>
      <h1> Orders </h1> 
      </div>
    </div>
</Layout>
  )
}

export default Orders