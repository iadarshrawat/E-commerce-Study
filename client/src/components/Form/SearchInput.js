import React from 'react'
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`)
            setValues({...values, results:data})
            navigate("/search");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form classname="d-flex" role='search' onSubmit={handleSubmit}>
                <input classname="form-control me-2" type="search" placeholder="Search product" value={values.keyword} onChange={(e)=>setValues({...values, keyword:e.target.value})}/>
                <button classname="btn btn-outline-success " type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput