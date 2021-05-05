import { useConnection } from "../context/ConnectionContext"

export const Footer = () => {

    const { isConnected } = useConnection()

    return (
        <>
            <header>footer!</header>
        </>
    )
}
