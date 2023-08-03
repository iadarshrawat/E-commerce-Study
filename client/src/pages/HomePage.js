import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <div>
        <Layout>
          <h1>Home page</h1>
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    </div>
  )
}

export default HomePage