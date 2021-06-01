import React from 'react'
import { CreateProvider } from '../../context/CreateContext'
import { Layout } from '../../components/layouts/layout'
import { CreateRoom } from '../../components/create/createRoom'

export default () => {
    return (
        <CreateProvider>
            <Layout>
                <CreateRoom />
            </Layout>
        </CreateProvider>
    )
}
