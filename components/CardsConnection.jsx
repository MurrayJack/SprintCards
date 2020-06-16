import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";

export const CardsConnection = ({ onConnect }) => {
    const [userName, setUserName] = useState();
    const [rememberMe, setRememberMe] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        window.setTimeout(() => {
            window.localStorage.setItem("sprint-cards-name", userName);

            onConnect(userName);
        }, 1000);
    };

    const handleRememberMeClick = (value) => {
        window.localStorage.setItem("sprint-cards-remember", value);
        setRememberMe(value === "on");
    };

    useEffect(() => {
        const localName = window.localStorage.getItem("sprint-cards-name");
        const remember = window.localStorage.getItem("sprint-cards-remember");

        if (localName) {
            setUserName(localName);

            if (remember) {
                onConnect(localName);
            }
        }
    }, []);

    return (
        <>
            <article>
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
                    <label>
                        <span>
                            <input
                                onClick={(e) => handleRememberMeClick(e.target.value)}
                                type="checkbox"
                                checked={rememberMe}
                            />{" "}
                            Remember Me
                        </span>
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
