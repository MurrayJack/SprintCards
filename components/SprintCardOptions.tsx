import SprintCard from './SprintCard'
import { useConnection } from '../context/ConnectionContext'
import { getCard } from './CardSets'

export default () => {
    const { selection, select, results } = useConnection()

    return (
        <>
            <section>
                <ul>
                    {results && getCard(results?.cardSet).map((e) => (
                        <li key={e.caption}>
                            <SprintCard onClick={select} hoverable card={e} selected={selection === e.caption} />
                        </li>
                    ))}
                </ul>
            </section>
            <style jsx>{`
                section {
                    padding: var(--gaps-xlarge);
                    height: 100%;
                    box-sizing: border-box;
                    overflow-x: auto;
                    max-width: 100%;
                    display: flex;
                    
                }

                ul {
                    display: grid;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    grid-auto-flow: column;
                    grid-auto-columns: 1fr;
                    grid-gap: 16px;
                    justify-content: center;
                    height: 100%;
                }

                li {
                   
                    padding: 0;
                    margin: 0;
                    height: 100%;
                }
            `}</style>
        </>
    )
}
