import { useConnection } from '../context/ConnectionContext'

export const CardsFooter = () => {
    const { clear, reveal } = useConnection()

    return (
        <>
            <footer>
                <button onClick={reveal}>Reveal</button>
                <button onClick={clear}>Clear</button>
            </footer>

            <style jsx>{`
                footer {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 20px;
                    padding: 20px;
                }

                button {
                    border-radius: 0;
                }

                button:hover {
                    background-color: var(--color-accent-color);
                }
            `}</style>
        </>
    )
}
