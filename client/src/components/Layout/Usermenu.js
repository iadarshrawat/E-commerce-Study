import React from 'react'
import { NavLink } from 'react-router-dom'

function Usermenu() {
    return (
        <>
            <div className='text-center'>

                <div class="list-group">
                    <h1>Dashboard</h1>
                    <NavLink to="/dashboard/user/profile" class="list-group-item list-group-item-action"> Profile </NavLink>
                    <NavLink to="/dashboard/user/orders" class="list-group-item list-group-item-action"> Orders </NavLink>
                </div>
            </div>
        </>
    )
}

export default Usermenu