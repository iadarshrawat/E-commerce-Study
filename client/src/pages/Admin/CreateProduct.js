import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';
const {Option} = Select;

function CreateProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState()
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  

  // get all categories
  const getAllCAtegory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/allCategory')
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("something wents wrong while getting categories")
    }
  }


  const handleCreate = (e)=>{
    e.preventDefault();
    try {
        const productData = new FormData();
        productData.append("name",name)
        productData.append("description",description)
        productData.append("price",price)
        productData.append("quantity",quantity)
        productData.append("photo",photo)
        productData.append("category",category)
        productData.append("shipping",shipping)
        const {data} = axios.post('http://localhost:8080/api/v1/product/createProduct', productData)
        if(data?.success) {
          toast.error("error while creating product")
        }
        else{
          toast.success("product created successfully")
          navigate('/dashboard/admin/products')
        }

    } catch (error) {
        console.log(error)
        toast.error("something wents wrong")
    }
  }


  useEffect(()=>{
    getAllCAtegory();
  },[])

  return (
    <Layout>
    <div className='row'>
      <div className='col-md-3'>
          <Adminmenu/>
      </div>
      <div className='col-md-9'>
      <h1>Create Products</h1>
      <div className='m-1'>
        <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
        {
          categories?.map((c)=>(
            <Option key={c._id} value={c._id} >{c.name}</Option>
          ))
        }
        </Select>

        <div className='mb-3'>
          <label htmlFor='upload images'>
            <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}></input>
          </label>
        </div>


        <div className='mb-3'>
            <input type='text' value={name} placeholder='Write a name' className='form-control' onChange={(e)=>setName(e.target.value)}></input>
            <input type='textarea' value={description} placeholder='Write a description' className='form-control' onChange={(e)=>setDescription(e.target.value)}></input>
            <input type='text' value={price} placeholder='Write a price' className='form-control' onChange={(e)=>setPrice(e.target.value)}></input>
            <input type='text' value={quantity} placeholder='Write a Quantity' className='form-control' onChange={(e)=>setQuantity(e.target.value)}></input>
        </div>
        <div className='mb-3'>
            <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setShipping(value)}}>
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
        </div>

        <div>
          <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
        </div>

      </div> 
      </div>
    </div>
</Layout>
  )
}

export default CreateProduct