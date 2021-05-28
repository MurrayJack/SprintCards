import { useConnection } from '../context/ConnectionContext'
import { AiOutlineHome, AiOutlineShareAlt, AiOutlineUser } from 'react-icons/ai'
import { GiCardPickup } from 'react-icons/gi'
import { FC } from 'react'
import { IconType } from 'react-icons'
import CurrentUsers from './currentUsers'

export const Header = () => {
    const { user, room } = useConnection()

    return (
        <>
            <header>
                <GiCardPickup />
                <h1>Sprint Cards</h1>

                <HeaderButton icon={AiOutlineShareAlt} title="Share">
                    <>
                        <input value={`${window.location.host}/${room}`} />
                    </>
                </HeaderButton>

                <HeaderButton icon={AiOutlineUser} title={user}>
                    <div>
                        <ul>
                            <li>Name</li>
                        </ul>
                    </div>
                </HeaderButton>

                <HeaderButton icon={AiOutlineHome} title={room}>
                    <CurrentUsers />
                </HeaderButton>
            </header>
            <style jsx>{`
                header {
                    display: grid;
                    gap: 8px;
                    align-items: center;
                    padding: 0 16px;
                    grid-template-columns: auto 1fr auto auto auto;
                }

                input {
                    width: 300px
                }

                h1 {
                    padding: 0;
                    margin: 0;
                    font-size: 16px;
                }
            `}</style>
        </>
    )
}

interface IHeaderButtonProps {
    icon: IconType
    title: string
}

const HeaderButton: FC<IHeaderButtonProps> = ({ title, children, icon: Icon }) => {
    return (
        <>
            <div>
                <button>
                    <span>
                        <Icon />
                    </span>

                    <span>{title}</span>
                </button>
                <section>{children}</section>
            </div>

            <style jsx>{`
                button {
                    border: 0;
                    background: transparent;
                    gap: 8px;
                    display: flex;
                    align-items: center;
                    text-transform: unset;
                    padding: 0;
                    margin: 0 8px;
                }

                button:hover {
                    color: var(--color-accent-color);
                }

                div {
                    position: relative;
                }

                div:focus-within button {
                    color: var(--color-accent-color);
                }

                div:focus-within section {
                    display: block
                }

                section {
                    position: absolute;
                    right: 0;
                    z-index: 10;
                    padding: 20px;
                    display: none;
                    width: auto;
                    height: auto;
                    border: 1px solid var(--main-border-color);
                    border-radius: 3px;
                    padding: var(--gaps-xxxlarge);
                    grid-gap: var(--gaps-xxlarge);
                    background: var(--main-bg-color2);
                    margin-top: 16px;
                }
            `}</style>
        </>
    )
}
