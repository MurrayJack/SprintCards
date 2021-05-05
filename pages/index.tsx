import React from 'react'
import { App } from '../components/app'
import { Layout } from '../components/Layout'
import { Login } from '../components/Login'
import { ConnectionProvider, useConnection } from '../context/ConnectionContext'

const Home = () => {
    return (
        <ConnectionProvider>
            <Application />
        </ConnectionProvider>
    )
}

const Application = () => {
    const { isConnected } = useConnection()

    return (
        <Layout>
            {!isConnected && <Login type="Full" />}
            {isConnected && <App />}
        </Layout>
    )
}

export default Home
