import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const totalPrice = ()=>{
        try {
            let total = 0;
            cart?.map(item=>{total = total + item.price})
            return total;
        } catch (error) {
            console.log(error)
        }
    }

    const removeCartItem = (pid)=>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id===pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 1 ? `you have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your cart in empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-9'>
                        {
                            cart?.map(p => (
                                <div className='row'>
                                    <div className="col-md-4">
                                        <img className="card-img-top" src={`http://localhost:8080/api/v1/product/productPhoto/${p._id}`} alt={p.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">{p.price}</p>
                                        <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr/>
                        <h4>Total : {totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage