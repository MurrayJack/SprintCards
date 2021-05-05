import { createContext, FC, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { ICard } from '../components/cards'

export interface IContext {
    connect: (id: string, name: string) => void
    reveal?: () => void
    clear?: () => void
    select?: (card: string) => void
    isConnected: boolean
    isRevealed?: boolean
    selection?: string
    user?: string
    room?: string
    results?: {
        room: string
        users: { [key: string]: { selection: string } }
    }
}

export const ConnectionContext = createContext<IContext>({
    connect: () => {},
    isConnected: false,
})

export const ConnectionProvider: FC<{ room?: string }> = ({ children, room: initialRoom }) => {
    const [isConnected, setConnected] = useState(false)
    const [room, setRoom] = useState(initialRoom)
    const [user, setUser] = useState('')
    const [selection, setCurrentSelection] = useState<string>()
    const [isRevealed, setRevealed] = useState<boolean>()

    const [results, setResults] = useState()

    const handleSelect = (card: string) => {
        setCurrentSelection(card)
    }

    const handleConnect = (key: string, name: string) => {
        setConnected(true)
        setUser(name)
        setRoom(key)
    }

    const handleReveal = () => {
        setRevealed(true)
        socket.emit('reveal', { room, user })
    }

    const handleClear = () => {
        setCurrentSelection(undefined)
        setRevealed(false)
        socket.emit('clear', { room, user })
    }

    let socket = io()

    useEffect(() => {
        if (isConnected) {
            socket.on('connect', function () {
                socket.emit('room', { room, user })
            })

            socket.on('message', function (data) {
                console.log(data)
            })

            socket.on('update', function (data) {
                setResults(data)
            })

            socket.on('reveal', function () {
                if (!isRevealed) {
                    setRevealed(true)
                }
            })
        }
    }, [isConnected, user, room])

    useEffect(() => {
        if (selection) {
            socket.emit('selection', { room, user, selection })
        }
    }, [selection])

    useEffect(() => {
        if (isRevealed) {
            socket.emit('reveal', { room, user })
        }
    }, [isRevealed])

    return (
        <ConnectionContext.Provider
            value={{
                selection,
                select: handleSelect,
                connect: handleConnect,
                reveal: handleReveal,
                clear: handleClear,
                isRevealed,
                isConnected,
                results,
                user,
                room,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    )
}

export const useConnection = () => useContext(ConnectionContext)
