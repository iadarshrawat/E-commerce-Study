import Layout from './../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../context/search'

function Search() {
    const [values, setValues] = useSearch()
    return (
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length} results`}</h6>

                    <div className="d-flex flex-wrap">
                        {values.results?.map(p => (
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
    )
}

export default Search