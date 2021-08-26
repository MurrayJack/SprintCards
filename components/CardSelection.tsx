import { useConnection } from '../context/ConnectionContext'
import { getCard } from './CardSets'
import SprintCard from './SprintCard'

export const CardSelection = () => {
    const { results } = useConnection()

    const users = Object.keys(results?.users || {})

    return (
        <>
            <section>
                <ul>
                    {users.map((e) => (
                        <li key={e}>
                            <SprintCard
                                card={getCard(results.cardSet).find(c => c.caption === results.users[e].selection)}
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
                    height: 100%;
                    box-sizing: border-box;
                    overflow-x: auto;
                    max-width: 100%;
                    display: flex;
                }

                ul {
                    display: flex;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    grid-template-columns: repeat(7, 1fr);
                    grid-gap: 16px;
                    justify-content: center;
                    height: 100%;
                }

                li {
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    height: 100%;
                    grid-template-rows: 1fr auto;
                }

                p {
                    font-size: 24px;
                    font-weight: bold;
                    text-transform: uppercase;
                    text-align: center;
                    width: 170px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 0;
                    margin: 0;
                }
            `}</style>
        </>
    )
}
