import React from 'react'
import { NavLink } from 'react-router-dom'

function Adminmenu() {
    return (
        <>
            <div className='text-center'>

                <div class="list-group">
                    <h1>Admin Pannel</h1>
                    <NavLink to="/dashboard/admin/createCategory" class="list-group-item list-group-item-action">Create Category </NavLink>
                    <NavLink to="/dashboard/admin/createProduct" class="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/users" class="list-group-item list-group-item-action">Users</NavLink>
                    <NavLink to="/dashboard/admin/products" class="list-group-item list-group-item-action">Products</NavLink>
                </div>
            </div>
        </>
    )
}

export default Adminmenu