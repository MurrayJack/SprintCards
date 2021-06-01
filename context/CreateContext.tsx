import { createContext, FC, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useRouter } from 'next/router'

export interface IContext {
    create?: (room: string, password: string, cardSet) => void
}

export const CreateContext = createContext<IContext>({})

export const CreateProvider: FC = ({ children }) => {
    let socket = io()
    const router = useRouter()
    const [error, setError] = useState()

    const handleCreate = (room: string, password: string, cardSet: string) => {
        socket.emit('create', { room, password, cardSet })
    }

    useEffect(() => {
        socket.on('create', function ({ name, id }) {
            debugger
            router.push(`/${name}`)
        })

        socket.on('create_failed', function (data) {
            setError(data)
        })
    }, [])

    return (
        <CreateContext.Provider
            value={{
                create: handleCreate,
            }}
        >
            <div>{error}</div>

            {children}
        </CreateContext.Provider>
    )
}

export const useCreate = () => useContext(CreateContext)