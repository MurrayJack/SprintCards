export interface ISprintCard {
    card?: ICard
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
        let names = "";
        names += hoverable && " hoverable ";
        names += hidden && " hidden "
        return names;
    }   

    return (
        <>
            <>
                <button
                    className={buildClassNames()}
                    aria-current={selected}
                    onClick={handleOnClick}
                >
                    <div>
                        {card && card.icon(null)}
                    </div>
                    <div>
                        {card && card.caption}
                    </div>
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
                    border: 5px solid #487eb0;
                    border-radius: 5px;
                    width: 170px;
                    height: 260px;
                    background-color: var(--main-bg-color2);
                    font-size: 60px;
                    color: var(--main-color2);
                    cursor: pointer;
                    position: relative;
                    transition: all linear 0.2s;
                    position: relative;
                }

                button.hoverable:hover {
                    transform: scale(1.1);
                }

                button.hidden {
                    animation: example 1s infinite;
                }

                button.hidden > div {
                    opacity: 0;
                }

                button div:first-of-type {
                    color: var(--color-accent-color);
                }

                div:first-of-type {
                }

                button[aria-current='true'] {
                    transform: scale(1.1);
                    z-index: 1;
                    border: 5px solid var(--color-accent-color);
                    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.8);
                }

                button[disabled] {
                    opacity: 0.4;
                }
            `}</style>
        </>
    )
}
