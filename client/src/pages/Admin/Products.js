import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import Adminmenu from '../../components/Layout/Adminmenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Products() {

    const [products, setProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/getProduct');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('something wents wrong')
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <Adminmenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products List</h1>
                    <div className="d-flex">
                    {products?.map(p => (
                        <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='text-black'>
                        <div className="card m-2" style={{ width: '18rem' }}>
                                <img className="card-img-top" src={`http://localhost:8080/api/v1/product/productPhoto/${p._id}`} alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>
                        </Link>   
                    ))}
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}

export default Products