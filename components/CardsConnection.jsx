import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";

export const CardsConnection = ({ onConnect, connected }) => {
    const [userName, setUserName] = useState();
    const [rememberMe, setRememberMe] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        window.localStorage.setItem("sprint-cards-name", userName);

        onConnect(userName);
    };

    useEffect(() => {
        const localName = window.localStorage.getItem("sprint-cards-name");

        if (localName) {
            setUserName(localName);
        }
    }, []);

    return (
        <>
            <article data-connected={connected}>
                <form onSubmit={handleOnSubmit}>
                    <h2>Connect to Sprint Cards</h2>
                    <label>
                        <span>Name:</span>

                        <div>
                            <FiUser />
                        </div>

                        <input
                            autoFocus
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="please enter your name"
                        />
                    </label>

                    <button type="submit">Connect</button>
                </form>
            </article>

            <style jsx>{`
                article {
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    width: 100vw;
                    position: absolute;
                    background: var(--main-bg-color);
                    z-index: 1;
                    transition: opacity ease-in-out 0.2s;
                }

                article[data-connected="false"] {
                    opacity: 0.95;
                }

                article[data-connected="true"] {
                    opacity: 0;
                    pointer-events: none;
                }

                form {
                    border: 1px solid var(--main-border-color);
                    border-radius: 3px;
                    padding: var(--gaps-xxxlarge);
                    display: grid;
                    grid-gap: var(--gaps-xxlarge);
                    background: var(--main-bg-color2);
                }

                label {
                    position: relative;
                    display: grid;
                    grid-gap: var(--gaps-medium);
                }

                div {
                    bottom: 16px;
                    left: 16px;
                    position: absolute;
                    color: var(--color-accent-color);
                    pointer-events: none;
                }

                input {
                    text-indent: 20px;
                }
            `}</style>
        </>
    );
};
