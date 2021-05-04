import { useConnection } from '../context/ConnectionContext'
import { ICard } from './cards'
import SprintCard from './SprintCard'
import cards from "./cards";

export interface ICardSelectionProps {
    answers: ICard[]
    revealed: boolean
    onCurrentClick: () => void
}

export const CardSelection = () => {
    const { results, isRevealed } = useConnection()

    const buildResults = () => {
        const items = []
        for (var property in results?.users) {
            if (results?.users.hasOwnProperty(property)) {
                items.push(
                    <li key={property}>
                        <SprintCard
                            
                            // hide={!isRevealed}
                            // name={property}
                            // caption={results.users[property].selection}
                        />
                        <p>{property}</p>
                    </li>,
                )
            }
        }
        return items
    }

    return (
        <>
            <section>
                <ul>
                    <ul>{buildResults()}</ul>
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
