import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { toast } from 'react-hot-toast';

function CartPage() {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price })
            return total;
        } catch (error) {
            console.log(error)
        }
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error)
        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken();

    }, [auth?.token])


    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post('http://localhost:8080/api/v1/product/braintree/payment', {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment Successfull')
        } catch (error) {
            console.log(error)
            setLoading(false)
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
                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update address</button>
                                </div>
                            </>
                        ) : (
                            <div className='mb-3'>
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    ) : (
                                        <button onClick={() => navigate('/login')}>please Login to checkout</button>
                                    )
                                }
                            </div>
                        )}
                        <div className='mt-2'>
                            {
                                !clientToken || !cart.length ? ("") :
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={instance => setInstance(instance)}
                                        />
                                        
                            <button className='btn btn-primary' onClick={handlePayment}
                                disabled={loading || !instance || !auth?.user?.address}
                            >{loading ? "processing..." : "Make payment"}</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage