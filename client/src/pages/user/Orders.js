import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'

function Orders() {
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [])

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-3'>
          <Usermenu />
        </div>
        <div className='col-md-9'>
          <h1>All Orders </h1>

          <div className='border shadow'>
            <table className="table">
              <thead>
                <tr>
                  <td scope='col'>#</td>
                  <td scope='col'>Status</td>
                  <td scope='col'>Buyer</td>
                  <td scope='col'>Orders</td>
                  <td scope='col'>Payment</td>
                  <td scope='col'>Quantity</td>
                </tr>
              </thead>
              {
                orders?.map((o, i) => {
                  return (
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>{o?.status}</th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createAt).fromNow()}</th>
                        <th>{o?.payment.success ? "Success":"Error"}</th>
                        <th>{o?.products?.length}</th>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
          </div>



        </div>
      </div>
    </Layout>
  )
}

export default Orders