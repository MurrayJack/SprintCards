import SprintCard from './SprintCard'
import cards from './cardSets/cards'
import { useConnection } from '../context/ConnectionContext'

export default () => {
    const { selection, select } = useConnection()

    return (
        <>
            <section>
                <ul>
                    {cards.map((e) => (
                        <li key={e.caption}>
                            <SprintCard onClick={select} hoverable card={e} selected={selection === e.caption} />
                        </li>
                    ))}
                </ul>
            </section>
            <style jsx>{`
                section {
                    padding: var(--gaps-xlarge);
                    display: grid;
                    align-content: center;
                    height: 100%;
                    box-sizing: border-box;
                }

                ul {
                    display: grid;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    grid-template-columns: repeat(7, 1fr);
                    grid-gap: 16px;
                    justify-content: center;
                }

                li {
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    padding: 0;
                    margin: 0;
                }
            `}</style>
        </>
    )
}
