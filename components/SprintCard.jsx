import cards from "./cards";

export default ({ current, caption, onClick, name = "", disabled, hide = false }) => {
    // Do things here

    const handleOnClick = () => {
        onClick(caption);
    };

    const Icon = () => {
        if (caption !== "0") {
            const icon = cards.filter((e) => e.caption === caption)[0].icon;
            return icon();
        }

        return <div></div>;
    };

    const Caption = () => {
        return <div>{caption !== "0" ? caption : ""}</div>;
    };

    return (
        <>
            <>
                <button
                    className={caption !== "0" && hide ? "hello" : ""}
                    aria-current={current === caption}
                    onClick={handleOnClick}
                    disabled={disabled}
                >
                    <div>
                        <Icon />
                    </div>
                    <div>
                        <Caption />
                    </div>
                </button>
                <p>{name}</p>
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

                button:hover {
                    transform: scale(1.1);
                }

                button.hello {
                    animation: example 1s infinite;
                }

                button.hello > div {
                    opacity: 0;
                }

                button div:first-of-type {
                    color: var(--color-accent-color);
                }

                div:first-of-type {
                }

                button[aria-current="true"] {
                    transform: scale(1.1);
                    z-index: 1;
                    border: 5px solid var(--color-accent-color);
                    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.8);
                }

                button[disabled] {
                    opacity: 0.4;
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
    );
};
