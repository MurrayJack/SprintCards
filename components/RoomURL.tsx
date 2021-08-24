import { useConnection } from '../context/ConnectionContext'

export const RoomURL = () => {
    const { room } = useConnection()

    return <input value={`${window.location.host}/${room}`} />
}
