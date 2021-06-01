import React from 'react'
import { useConnection } from '../../context/connectionContext'
import { CardSelection } from './cardSelection'
import { CardsFooter } from './cardsFooter'
import SprintCardOptions from './sprintCardOptions'
import { Header } from './header'

export const App = () => {
    return (
        <>
            <article>
                <main>
                    <Header />

                    <SprintCardOptions />

                    <CardSelection />

                    <CardsFooter />
                </main>
            </article>

            <style jsx>{`
                @media (min-width: 700px) {
                    main {
                        display: grid;
                        grid-template-rows: 50px max-content 1fr 100px;
                        height: 100vh;
                        width: 100vw;
                    }

                    article {
                        white-space: nowrap;
                        overflow: hidden;
                        display: grid;
                        grid-auto-flow: column;
                    }
                }
            `}</style>
        </>
    )
}
