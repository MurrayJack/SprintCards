import { useRouter } from 'next/router'
import React from 'react'
import { App } from '../../components/app'
import { Layout } from '../../components/Layout'
import { Login } from '../../components/login'
import { ConnectionProvider, useConnection } from '../../context/ConnectionContext'

export default () => {
    const router = useRouter()
    const { room } = router.query

    return (
        <ConnectionProvider room={room as string}>
            <Application />
        </ConnectionProvider>
    )
}

const Application = () => {
    const router = useRouter()
    const { isConnected } = useConnection()
    const { room } = router.query

    return (
        <Layout>
            {!isConnected && <Login roomName={room as string} />}
            {isConnected && <App />}
        </Layout>
    )
}
