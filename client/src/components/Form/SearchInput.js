import React from 'react'
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/SearchInput.scss'

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
        <div className='searchInput'>

            <form onSubmit={handleSubmit} >
                <input width="4" type="search"  placeholder="Search your favrouite item" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })}/>
                <button className="btn" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput