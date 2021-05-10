import React from 'react'
import { App } from '../components/app'
import { Layout } from '../components/Layout'
import { Login } from '../components/login'
import { ConnectionProvider, useConnection } from '../context/ConnectionContext'
import { ToastProvider } from 'react-toast-notifications'

const Home = () => {
    return (
        <ToastProvider>
            <ConnectionProvider>
                <Application />
            </ConnectionProvider>
        </ToastProvider>
    )
}

const Application = () => {
    const { isConnected } = useConnection()

    return (
        <Layout>
            {!isConnected && <Login />}
            {isConnected && <App />}
        </Layout>
    )
}

export default Home
