import React from 'react'
import { App } from '../../components/app'
import { Layout } from '../../components/Layout'
import { Login } from '../../components/login'
import { ConnectionProvider, useConnection } from '../../context/ConnectionContext'

export default ({ room }) => {
    return (
        <ConnectionProvider room={room as string} roomFromUrl>
            <Application />
        </ConnectionProvider>
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
