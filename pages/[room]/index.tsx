import React from 'react'
import { App } from '../../components/application/app'
import { Layout } from '../../components/layouts/layout'
import { Login } from '../../components/login'
import { ConnectionProvider, useConnection } from '../../context/ConnectionContext'
import { ToastProvider } from 'react-toast-notifications'

export default ({ room }) => {
    return (
        <ToastProvider>
            <ConnectionProvider room={room as string} roomFromUrl>
                <Application />
            </ConnectionProvider>
        </ToastProvider>
    )
}

export async function getServerSideProps({ query }) {
    return {
        props: { room: query.room },
    }
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
