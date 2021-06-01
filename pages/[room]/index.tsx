import React, { useState } from 'react'
import { App } from '../../components/application/app'
import { Layout } from '../../components/layouts/layout'
import { Login } from '../../components/login/login'
import { ConnectionProvider, useConnection } from '../../context/connectionContext'

export default ({ roomName }) => {
    const [userName, setUserName] = useState<string>()

    return (
        <Layout>
            {!userName && <Login roomName={roomName} onEnterRoom={setUserName} />}

            {userName && <ConnectionProvider userName={userName} roomName={roomName as string}>
                <App />
            </ConnectionProvider>}
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    return {
        props: { roomName: query.room },
    }
}
