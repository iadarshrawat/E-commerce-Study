import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../context/cart';

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

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
      <nav className="navbar navbar-expand-lg" >
        <div className="container-fluid tackel">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand">GearGlide.com</Link>
            <ul className="navbar-nav ms-auto mb-lg-0">

              <SearchInput/>

              <li className="nav-item">
                <NavLink to='/' className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/category' className="nav-link">Category</NavLink>
              </li> 
              <li className="nav-item">
                <NavLink to='/cart' className="nav-link">Cart {cart?.length}</NavLink>
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
                      <Link className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {auth?.user?.name}
                      </Link>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item"> Dashboard </NavLink>
                        <NavLink to='/login' className="nav-link" onClick={handleLogout}>logout</NavLink>
                      </div>
                    </div>

                <li className="nav-item">
                
              </li>
                </>
              )
             }
            </ul>
          </div>
        </div>
      </nav>

    </>
  )

}

export default Header