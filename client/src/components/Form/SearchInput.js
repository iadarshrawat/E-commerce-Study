import React from 'react'
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            navigate("/search");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

            <form className="form-inline my-2 my-lg-0"  onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" width="4" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput