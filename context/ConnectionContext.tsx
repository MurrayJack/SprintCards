import { createContext, FC, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

export interface IContext {
    reveal?: () => void
    clear?: () => void
    select?: (card: string) => void
    kick?: (name: string) => void

    userName?: string
    roomName?: string
    selection?: string

    results?: {
        revealed: boolean
        room: string
        password: string
        cardSet: string
        users: { [key: string]: { selection: string } }
    }
}

export const ConnectionContext = createContext<IContext>({})

export const ConnectionProvider: FC<{ roomName: string; userName: string }> = ({ children, roomName, userName }) => {
    // const [isConnected, setConnected] = useState(false)
    // const [user, setUser] = useState('')
    const [selection, setCurrentSelection] = useState<string>()
    const [results, setResults] = useState()

    // const handleCreate = (room: string, password: string, cardSet: string) => {
    //     socket.emit('create', { room, password, cardSet })
    // }

    const handleSelect = (selection: string) => {
        setCurrentSelection(selection)
        socket.emit('selection', { roomName, userName, selection })
    }

    // // const handleConnect = (room: string, user: string) => {
    // //     setUser(user);
    // //     socket.emit('clear', { room, user })
    // // }

    const handleReveal = () => {
        socket.emit('reveal', { roomName })
    }

    const handleClear = () => {
        setCurrentSelection(undefined)
        socket.emit('clear', { roomName })
    }

    const handleKick = (name) => {
        socket.emit('kick', { roomName, name })
    }

    let socket = io()

    useEffect(() => {
        //     socket.on('kick', function ({ name, room }) {
        //         setResults(room)
        //         if (name === user) {
        //             setConnected(false)
        //         }
        //     })
        socket.on('update', function (room) {
            // /         setConnected(true)
            setResults(room)
        })

        socket.emit('enter', { roomName, userName })
    }, [])

    // useEffect(() => {
    //     if (selection) {
    //         socket.emit('selection', { room, user, selection })
    //     }
    // }, [selection])

    return (
        <ConnectionContext.Provider
            value={{
                select: handleSelect,
                reveal: handleReveal,
                clear: handleClear,
                kick: handleKick,
                // isConnected,
                selection,
                results,
                userName,
                roomName
                // room,
                // roomFromUrl,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    )
}

export const useConnection = () => useContext(ConnectionContext)
