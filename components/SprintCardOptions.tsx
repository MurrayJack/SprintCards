import SprintCard from './SprintCard'
import cards, { ISprintCard } from './cards'

export interface ISprintCardOptions {
    current: string
    onclick: () => void
}

export default ({ current, onclick }: ISprintCardOptions) => {
    return (
        <>
            <section>
                <ul>
                    {cards.map((e) => (
                        <li>
                            <SprintCard key={e.caption} current={current} onClick={onclick} {...e} />
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
