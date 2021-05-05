import React from 'react'
import { useConnection } from '../context/ConnectionContext'
import { Login } from './Login'
import { CardSelection } from './CardSelection'
import { CardsFooter } from './CardsFooter'
import { Layout } from './Layout'
import SprintCardOptions from './SprintCardOptions'

export const App = () => {
    const { isConnected } = useConnection()

    return (
        <>
            <Layout>
                <Login />

                <main>
                    <SprintCardOptions />

                    {isConnected ? <CardSelection /> : <div></div>}

                    <CardsFooter />
                </main>
            </Layout>

            <style jsx>{`
                main {
                    display: grid;
                    grid-template-rows: 1fr 1fr 100px;
                    height: 100vh;
                }
            `}</style>
        </>
    )
}
