import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Spinner({path='login'}) {
    const navigate = useNavigate();
    const [count, setCount] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => { setCount((prev) => --prev) }, 1000)
        count === 0 && navigate(`${path}`)
        return () => clearInterval(interval);
    }, [count, navigate, path])
    return (
        <div className='container d-flex justify-content-center'>
            <h1>
                <div>Redireting to Dashborad  {count}</div>
                <div class="spinner-grow" role="status">
                    <span class="sr-only"></span>
                </div>
            </h1>

        </div>
    )
}

export default Spinner