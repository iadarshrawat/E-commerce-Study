import React from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'

function CreateCategory() {
  return (
    <Layout>
        <div className='row'>
          <div className='col-md-3'>
              <Adminmenu/>
          </div>
          <div className='col-md-9'>
          <h1>Create Category</h1> 
          </div>
        </div>
    </Layout>
  )
}

export default CreateCategory