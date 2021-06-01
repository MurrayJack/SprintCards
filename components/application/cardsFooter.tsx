import React from 'react'
import { useConnection } from '../../context/connectionContext'
import { Button } from '../controls/button'

export const CardsFooter = () => {
    const { clear, reveal } = useConnection()

    return (
        <>
            <footer>
                <Button onClick={reveal}>Reveal</Button>
                <Button onClick={clear}>Clear</Button>
            </footer>

            <style jsx>{`
                footer {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 20px;
                    padding: 20px;
                }
            `}</style>
        </>
    )
}
