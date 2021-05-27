import { createContext, FC, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

export interface IContext {
    create?: (room: string, name: string) => void
    connect: (room: string, name: string) => void
    reveal?: () => void
    clear?: () => void
    select?: (card: string) => void
    kick?: (name) => void
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

    const handleCreate = (room: string, user: string) => {
        socket.emit('create', { room, user })
    }

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

    const handleKick = (name) => {
        socket.emit('kick', { room, name })
    }

    let socket = io()

    useEffect(() => {
        socket.on('error', function (data) {
            console.log(data)
        })

        socket.on('inRoom', function ({ room, user }) {
            setRoom(room)
            setUser(user)
            setConnected(true)
        })

        socket.on('message', function (data) {
            console.log(data)
        })
    }, [])

    useEffect(() => {
        if (isConnected) {
            socket.on('connect', function () {
                socket.emit('room', { room, user })
            })

            socket.on('update', function (data) {
                setResults(data)
            })

            socket.on('clear', function (data) {
                setResults(data)
                setRevealed(false)
            })

            socket.on('kick', function ({ name, cards }) {
                setResults(cards)
                if (name === user)  {
                    setConnected(false)
                }
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
                create: handleCreate,
                select: handleSelect,
                connect: handleConnect,
                reveal: handleReveal,
                clear: handleClear,
                kick: handleKick,
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
