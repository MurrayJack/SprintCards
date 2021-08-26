import React, { useState } from 'react'
import { useConnection } from '../context/ConnectionContext'
import { CardSelection } from './CardSelection'
import { CardsFooter } from './CardsFooter'
import SprintCardOptions from './SprintCardOptions'
import { Header } from './header'
import { CurrentUsers } from './AllUsers'
import { RoomURL } from './RoomURL'
import { AvailableCards } from './AvailableCards'

export const App = () => {
    const { isConnected, room } = useConnection()
    const [visible, setVisible] = useState(false)

    return (
        <>
            <article>
                <main>
                    <Header onClick={() => setVisible(!visible)} />

                    <SprintCardOptions />

                    {isConnected ? <CardSelection /> : <div></div>}

                    <CardsFooter />
                </main>
                <aside>
                    <h2>Room: {room}</h2>

                    <AvailableCards onChange={() => setVisible(false)} />

                    <CurrentUsers />

                    <RoomURL />
                </aside>
            </article>

            <style global jsx>{`
                * {
                    box-sizing: border-box;
                }

                body {
                    overflow: none;
                }
            `}</style>

            <style jsx>{`
                main {
                    display: grid;
                    grid-template-rows: 50px 1fr 1fr 100px;
                    height: 100vh;
                    width: 100vw;
                    box-sizing: border-box;
                }

                aside {
                    width: 400px;
                    padding: 16px;
                    box-sizing: border-box;
                    background: white;
                    color: var(--main-bg-color);
                    display: grid;
                    grid-template-rows: auto auto 1fr auto;
                    gap: 16px;
                }

                article {
                    transform: ${visible ? 'translateX(-400px)' : '0'};
                    white-space: nowrap;
                    overflow: hidden;
                    display: grid;
                    grid-auto-flow: column;
                    justify-content: space-around;
                    width: calc(100vw + 400px);
                    box-sizing: border-box;
                    transition: transform ease-in-out 0.2s;
                }
            `}</style>
        </>
    )
}
