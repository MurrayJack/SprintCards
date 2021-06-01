import { ICardSet } from "../cardSets"

export interface ISprintCard {
    card?: ICardSet
    onClick?: (item: string) => void
    hidden?: boolean
    hoverable?: boolean
    selected?: boolean
}

export default ({ card, selected, onClick, hoverable, hidden }: ISprintCard) => {
    const handleOnClick = () => {
        onClick(card.caption)
    }

    const buildClassNames = () => {
        let names = ''
        names += hoverable && ' hoverable '
        names += hidden && ' hidden '
        return names
    }

    return (
        <>
            <>
                <button className={buildClassNames()} aria-current={selected} onClick={handleOnClick} type="button">
                    <span>{card && card.icon(null)}</span>
                    <span>{card && card.caption}</span>
                </button>
            </>
            <style jsx>{`
                @keyframes example {
                    from {
                        transform: rotateY(0);
                    }
                    to {
                        transform: rotateY(1turn);
                    }
                }

                button {
                    width: 100%;
                    border: 5px solid #487eb0;
                    border-radius: 5px;
                    background-color: var(--main-bg-color2);
                    color: var(--main-color2);
                    font-size: 40px;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    padding: 16px;
                }

                button[aria-current='true'] {
                    transform: scale(1.1);
                    z-index: 1;
                    border: 5px solid var(--color-accent-color);
                    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.8);
                }

                button.hidden {
                    animation: example 1s infinite;
                }

                button.hidden > span {
                    opacity: 0;
                }

                button > span:first-of-type {
                    color: var(--color-accent-color);
                    align-self: end;
                }

                @media (min-width: 700px) {
                    button {
                        border: 5px solid #487eb0;
                        border-radius: 5px;
                        height: 260px;
                        max-width: 170px;
                        background-color: var(--main-bg-color2);
                        font-size: 60px;
                        color: var(--main-color2);
                        cursor: pointer;
                        position: relative;
                        transition: all linear 0.2s;
                        position: relative;
                        grid-template-columns: initial;
                        grid-template-rows: 1fr 1fr;
                    }

                    button.hoverable:hover {
                        transform: scale(1.1);
                    }
                }
            `}</style>
        </>
    )
}
