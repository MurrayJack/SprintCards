import { useConnection } from '../../context/connectionContext'
import SprintCard from './sprintCard'
import { getCardSet } from '../cardSets'

export const CardSelection = () => {
    const { results } = useConnection()

    if (!results) return <div></div>

    const users = Object.keys(results?.users || {})
    
    const cards = getCardSet(results.cardSet)

    return (
        <>
            <section>
                <ul>
                    {users.map((e) => (
                        <li key={e}>
                            <SprintCard
                                card={cards.set?.find(c => c.caption === results.users[e].selection)}
                                hidden={!results.revealed && Boolean(results.users[e].selection !== "none")}
                            />
                            <p>{e}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <style jsx>{`
                section {
                    padding: var(--gaps-xlarge);
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
                }

                p {
                    font-size: 24px;
                    font-weight: bold;
                    text-transform: uppercase;
                    text-align: center;
                    width: 170px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>
        </>
    )
}
