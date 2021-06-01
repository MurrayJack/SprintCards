import React from 'react'
import { App } from '../components/application/app'
import { Layout } from '../components/layouts/layout'
import { Login } from '../components/login'
import { ConnectionProvider, useConnection } from '../context/ConnectionContext'
import { ToastProvider } from 'react-toast-notifications'
import { hri } from 'human-readable-ids'

const Home = () => {
    return (
        <ToastProvider>
            <ConnectionProvider room={hri.random()} roomFromUrl={false}>
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
