import { createContext, FC, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

export interface IContext {
    create?: (room: string, password: string, cardSet) => void
    connect: (room: string, name: string) => void
    reveal?: () => void
    clear?: () => void
    select?: (card: string) => void
    kick?: (name) => void
    isConnected: boolean
    selection?: string
    user?: string
    room?: string
    roomFromUrl?: boolean
    results?: {
        revealed: boolean
        room: string
        users: { [key: string]: { selection: string } }
    }
}

export const ConnectionContext = createContext<IContext>({
    connect: () => {},
    isConnected: false,
})

export const ConnectionProvider: FC<{ room?: string; roomFromUrl?: boolean }> = ({
    children,
    room: initialRoom,
    roomFromUrl,
}) => {
    const [isConnected, setConnected] = useState(false)
    const [room, setRoom] = useState(initialRoom)
    const [user, setUser] = useState('')
    const [selection, setCurrentSelection] = useState<string>()
    const [results, setResults] = useState()
    const { addToast } = useToasts()
    const router = useRouter()

    const handleCreate = (room: string, password: string, cardSet: string) => {
        socket.emit('create', { room, password, cardSet })
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
        socket.emit('reveal', { room, user })
    }

    const handleClear = () => {
        setCurrentSelection(undefined)
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
            debugger
            addToast(data)
            console.log(data)
        })

        socket.on('create', function ({ name, id }) {
            debugger
            router.push(`/${name}`)
        })

        socket.on('create_failed', function (data) {
            debugger
        })
    }, [])

    useEffect(() => {
        if (isConnected) {
            socket.on('connect', function () {
                socket.emit('room', { room, user })
            })

            socket.on('update', function (room) {
                setResults(room)
            })

            socket.on('kick', function ({ name, room }) {
                setResults(room)
                if (name === user) {
                    setConnected(false)
                }
            })
        }
    }, [isConnected, user, room])

    useEffect(() => {
        if (selection) {
            socket.emit('selection', { room, user, selection })
        }
    }, [selection])

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
                isConnected,
                results,
                user,
                room,
                roomFromUrl,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    )
}

export const useConnection = () => useContext(ConnectionContext)
