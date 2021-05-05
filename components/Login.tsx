import { FC, InputHTMLAttributes, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FiUser, FiHome } from 'react-icons/fi'
import { useConnection } from '../context/ConnectionContext'

export interface ILoginProps {
    type: 'Name' | 'Full'
}

export const Login = ({ type }: ILoginProps) => {
    const { connect, isConnected, room } = useConnection()

    const [userName, setUserName] = useState<string>('')
    const [roomKey, setRoomKey] = useState<string>(room)

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        connect(roomKey, userName)
    }

    useEffect(() => {
        const name = window.localStorage.getItem('username')
        if (name) {
            setUserName(name)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('username', userName)
    }, [userName])

    return (
        <>
            <article data-connected={isConnected}>
                <form onSubmit={handleOnSubmit}>
                    <h2>Connect to Sprint Cards</h2>

                    <InputControl
                        autoFocus
                        icon={FiUser}
                        placeholder="please enter your name"
                        label="Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    {type === 'Full' && (
                        <InputControl
                            icon={FiHome}
                            placeholder="please enter a room name"
                            label="Room"
                            value={roomKey}
                            onChange={(e) => setRoomKey(e.target.value)}
                        />
                    )}

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
            `}</style>
        </>
    )
}

const InputControl: FC<InputHTMLAttributes<HTMLInputElement> & { icon: IconType; label: string }> = ({
    icon: Icon,
    ...props
}) => {
    return (
        <>
            <label>
                <span>{props.label}:</span>

                <div>
                    <Icon />
                </div>

                <input required {...props} />
            </label>
            <style jsx>{`
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
