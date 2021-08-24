import { useConnection } from '../context/ConnectionContext'
import { GiCardPickup } from 'react-icons/gi'
import { Squash as Hamburger } from 'hamburger-react'

export const Header = ({ onClick }: { onClick: () => void }) => {
    const { user, room } = useConnection()

    return (
        <>
            <header>
                <GiCardPickup />
                <h1>Sprint Cards</h1>

                <Hamburger onToggle={onClick} />
            </header>
            <style jsx>{`
                header {
                    display: grid;
                    gap: 8px;
                    align-items: center;
                    padding: 0 16px;
                    grid-template-columns: auto 1fr auto;
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
