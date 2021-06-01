import SprintCard from './sprintCard'
import { useConnection } from '../../context/connectionContext'
import { getCardSet } from '../cardSets'

export default () => {
    const { selection, select, results } = useConnection()

    if (!results) return <div></div>

    const cards = getCardSet(results.cardSet)

    return (
        <>
            <section>
                <ul>
                    {cards.set.map((e) => (
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
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-auto-flow: row;
                    gap: 8px;
                }

                li {
                    justify-content: center;
                    display: inline-flex;
                }
                

                @media (min-width: 700px) { 
                    ul {
                        display: grid;
                        grid-auto-flow: column;
                        gap: 16px;
                        justify-content: center;
                        grid-auto-columns: 1fr;
                    }

                }

                 
                    /* section {
                    padding: var(--gaps-xlarge);
                    display: grid;
                    align-content: center;
                    
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

                 */
                }
            `}</style>
        </>
    )
}
