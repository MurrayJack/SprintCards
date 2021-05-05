import { useEffect, useState } from 'react'
import { FiUser, FiHome } from 'react-icons/fi'
import { useConnection } from '../context/ConnectionContext'

export const Login = () => {
    const [userName, setUserName] = useState<string>("")
    const [roomKey, setRoomKey] = useState<string>("")

    const { connect, isConnected} = useConnection();

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        connect(roomKey, userName)
    }

    return (
        <>
            <article data-connected={isConnected}>
                <form onSubmit={handleOnSubmit}>
                    <h2>Connect to Sprint Cards</h2>

                    <label>
                        <span>Room Key:</span>

                        <div><FiHome /></div>

                        <input
                            autoFocus
                            required
                            value={roomKey}
                            onChange={(e) => setRoomKey(e.target.value)}
                            placeholder="please enter a room key"
                        />
                    </label>

                    <label>
                        <span>Name:</span>

                        <div>
                            <FiUser />
                        </div>

                        <input
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

                article[data-connected='false'] {
                    opacity: 0.95;
                }

                article[data-connected='true'] {
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
    )
}
