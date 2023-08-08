import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'antd/es/typography/Link';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([])
  const [Categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/getProduct');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/allCategory')
      if (data?.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  }

  
  const filterProduct = async ()=>{
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/product/productFilter', {checked, radio});
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    getAllCategory();
  }, [])

  useEffect(() => {
    if(checked.length==0 || radio.length==0) getAllProducts();
  },[checked.length, radio.length])
  
  useEffect(() => {
    if(checked.length || radio.length) filterProduct();
  }, [checked, radio])



  return (
    <div>
      <Layout>
        <div className="row mt-4">
          <div className="col-md-2">
            <h3 className="text-center">Filter by Category</h3>
            <div className="d-flex flex-column m-4">
              {
                Categories.map(c => (
                  <Checkbox key={c.id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                ))
              }
            </div>

            {/*price filer */}
            <h3 className="text-center">Filter by Prices</h3>
            <div className="d-flex flex-column m-4">
              <Radio.Group onChange={e=>setRadio(e.target.value)}>
                {Prices.map(p => (
                  <div key={p.id}>
                    <Radio value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div>
              <button className='btn btn-danger m-4' onClick={()=>window.location.reload()}>Reset Filters</button>
            </div>
          </div>
          <div className="col-md-9 text-center">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map(p => (
                // <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='text-black'>
                <div className="card m-2" style={{ width: '18rem' }}>
                  <img className="card-img-top" src={`http://localhost:8080/api/v1/product/productPhoto/${p._id}`} alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text">{p.price}</p>
                    <button className='btn btn-primary ms-1'>See details</button>
                    <button className='btn btn-primary ms-1'>Add to Cart</button>
                  </div>
                </div>
                // </Link>   
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default HomePage