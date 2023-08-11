import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ProductDetails() {

    const params = useParams()
    const [product, setProduct] = useState({})

    // get product 
    const getProduct = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/getSingleProduct/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProduct();
    }, [params.slug])

  return (
    <Layout>
        <h1>Product Details</h1>
        {JSON.stringify(product, null , 4)}
        <button>ADD TO CART</button>
    </Layout>
   )
}

export default ProductDetails