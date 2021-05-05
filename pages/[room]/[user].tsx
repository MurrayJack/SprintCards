import { useRouter } from 'next/router'
import React from 'react'
import { App } from '../../components/app'
import { ConnectionProvider } from '../../context/ConnectionContext'

export default () => {
    const router = useRouter()
    const { room, user } = router.query

    return (
        <ConnectionProvider>
            {room} {user}
            <App />
        </ConnectionProvider>
    )
}
