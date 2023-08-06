import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { set } from 'mongoose';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'
import 'antd/dist/reset.css'

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/category/createCategory', {name})
      console.log(data.success)
      if(data.success) {
        getAllCAtegory();
        toast.success(`${name} is created`)
      }
    } catch (error) {
      console.log(error) 
      toast.error("something went wrong in input form")
    }
  }


  const getAllCAtegory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/allCategory')
      if (data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("something wents wrong while getting categories")
    }
  }


  
  const handleUpdate = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.put(`http://localhost:8080/api/v1/category/updateCategory/${selected._id}`,{name:updatedName})
      if(data.success) {
        toast.success(data.message)
        setSelected(null)
        setUpdatedName('')
        setVisible(false)
        getAllCAtegory();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error('something wents wrong')
    }
  }


  const handleDelete = async (id)=>{
    try {
      const {data} = await axios.delete(`http://localhost:8080/api/v1/category/deleteCategory/${id}`)
      if(data.success) {
        toast.success(`category is deleted`)
        getAllCAtegory();
      }
      else{ 
        toast.error(data.message)
      }
    } catch (error) {
        toast.error('something wents wrong')
    }
  }

  useEffect(() => {
    getAllCAtegory();
  }, [])

  return (
    <Layout>

      <div className='col-md-3 bg-danger'>
        <Adminmenu />
      </div>
      <div className='row container'>
        <div className='col-md-5'>
          <h1>Manage Category</h1>
          <div className='p-3'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
        </div>
        <div w-75>
          <table classname="table w-75">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map(c => (
                <>
                  <tr>
                    <td key={c.id}>{c.name}</td>
                    <td> <button className='btn btn-primary' onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}}> Edit </button> </td>
                    <td> <button className='btn btn-danger'onClick={()=>handleDelete(c._id)}>Delete</button> </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
              <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
              </Modal>
      </div>
    </Layout>
  )
}

export default CreateCategory