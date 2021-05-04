import { ISprintCard } from './cards'
import SprintCard from './SprintCard'

export interface ICardSelectionProps {
    answers: ISprintCard[]
    revealed: boolean
    onCurrentClick: () => void
}

export const CardSelection = ({ answers, revealed, onCurrentClick }: ICardSelectionProps) => {
    const buildResults = () => {
        const items = []
        for (var property in answers) {
            if (answers.hasOwnProperty(property)) {
                items.push(
                    <li>
                        <SprintCard
                            hide={!revealed}
                            name={property}
                            onClick={onCurrentClick}
                            caption={answers[property].caption}
                        />
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
            `}</style>
        </>
    )
}
