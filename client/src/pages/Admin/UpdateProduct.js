import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Adminmenu from '../../components/Layout/Adminmenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
const {Option} = Select;


function UpdateProduct() {

    const params = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState()
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    
  
    const getSingleProduct = async () =>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/getSingleProduct/${params.slug}`)
            setId(data.product._id)
            setName(data.product.name);
            setCategory(data.product.category);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getSingleProduct();
        //eslint-disbale-next
    }, [])


    // get all categories
    const getAllCategory = async () => {
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
  


    const handleUpdate = (e)=>{
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
            const {data} = axios.put(`http://localhost:8080/api/v1/product/updateProduct/${id}`, productData)
            if(data?.success) {
              toast.error("error while creating product")
            }
            else{
              toast.success("product updated successfully")
            }
    
        } catch (error) {
            console.log(error)
            toast.error("something wents wrong while updating")
        }
      }

      
      const handleDelete = async ()=>{

        try {
            let answer = prompt(`Are you want to deleting this products ? Write "YES" for deleting`)
            if(answer=='YES') {
                const res = await axios.delete(`http://localhost:8080/api/v1/product/deleteProduct/${id}`)
                if(res.data.success) {
                    toast.success("Deleted Successfully")
                    navigate('/dashboard/admin/products')
                }
                else {
                    toast.error(res.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("something wents wrong while deleting")
        }
      }

    
      useEffect(()=>{
        getAllCategory();
      },[])


    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <Adminmenu />
                </div>
                <div className='col-md-9'>
                    <h1>Update Products</h1>
                    <div className='m-1'>
                        <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                            {
                                categories?.map((c) => (
                                    <Option key={c._id} value={c._id} >{c.name}</Option>
                                ))
                            }
                        </Select>

                        <div className='mb-3'>
                            <label htmlFor='upload images'>
                                <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])}></input>
                            </label>
                        </div>


                        <div className='mb-3'>
                            <input type='text' value={name} placeholder='Write a name' className='form-control' onChange={(e) => setName(e.target.value)}></input>
                            <input type='textarea' value={description} placeholder='Write a description' className='form-control' onChange={(e) => setDescription(e.target.value)}></input>
                            <input type='text' value={price} placeholder='Write a price' className='form-control' onChange={(e) => setPrice(e.target.value)}></input>
                            <input type='text' value={quantity} placeholder='Write a Quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)}></input>
                        </div>
                        <div className='mb-3'>
                            <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => { setShipping(value) }}>
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>

                        <div>
                            <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                        </div>
                        <div>
                            <button className='btn btn-danger m-10' onClick={handleDelete}>Delete  Product</button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct