import { useConnection } from '../context/ConnectionContext'
import { AiOutlineHome, AiOutlineShareAlt, AiOutlineUser } from 'react-icons/ai'
import { GiCardPickup } from 'react-icons/gi'
import { FC } from 'react'
import { IconType } from 'react-icons'

export const Header = () => {
    const { user, room } = useConnection()

    return (
        <>
            <header>
                <GiCardPickup />
                <h1>Sprint Cards</h1>
                <HeaderButton icon={AiOutlineShareAlt}>Share</HeaderButton>
                <HeaderButton icon={AiOutlineUser}>{user}</HeaderButton>
                <HeaderButton icon={AiOutlineHome}>{room}</HeaderButton>
            </header>
            <style jsx>{`
                header {
                    display: grid;
                    gap: 8px;
                    align-items: center;
                    padding: 0 16px;
                    grid-template-columns: auto 1fr auto auto auto;
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
}

const HeaderButton: FC<IHeaderButtonProps> = ({ children, icon: Icon }) => {
    return (
        <>
            <button>
                <span>
                    <Icon />
                </span>

                <span>{children}</span>
            </button>

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
            `}</style>
        </>
    )
}
