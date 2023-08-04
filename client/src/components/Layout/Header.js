import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:"",
    })
    localStorage.removeItem('auth')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand">Ecommerce APP</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to='/' className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/category' className="nav-link">Category</NavLink>
              </li> 
             {
              !auth.user ? (
                <>
                 <li className="nav-item">
                <NavLink to='/register' className="nav-link">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/login' className="nav-link">login</NavLink>
              </li>
                </>
              ) : (
                <>

                    <div className="dropdown show">
                      <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {auth?.user?.name}
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <NavLink to="/dashboard" className="dropdown-item"> Dashboard </NavLink>
                        <NavLink to='/login' className="nav-link" onClick={handleLogout}>logout</NavLink>
                      </div>
                    </div>

                <li className="nav-item">
                
              </li>
                </>
              )
             }
              <li className="nav-item">
                <NavLink to='/cart' className="nav-link">Cart(0)</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )

}

export default Header