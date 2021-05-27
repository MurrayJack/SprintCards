import React, { useEffect, useState } from 'react'
import { FiUser, FiHome } from 'react-icons/fi'
import { Input } from '../controls/inputControl'
import { hri } from 'human-readable-ids'
import { useConnection } from '../../context/ConnectionContext'

interface INewRoomProps {
    roomName?: string
}

export const NewRoom = ({ roomName }: INewRoomProps) => {
    const { connect } = useConnection()
    const [userName, setUserName] = useState<string>('')
    const [roomKey, setRoomKey] = useState<string>()

    useEffect(() => {
        if (!roomName) {
            setRoomKey(hri.random())
        } else {
            setRoomKey(roomName)
        }

        const name = window.localStorage.getItem('username')
        if (name) {
            setUserName(name)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('username', userName)
    }, [userName])

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        connect(roomKey, userName)
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <Input
                    autoFocus
                    icon={FiUser}
                    placeholder="please enter your name"
                    label="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <Input
                    autoFocus
                    icon={FiHome}
                    placeholder="please enter a room name"
                    label="Room ID"
                    value={roomKey}
                    onChange={(e) => setRoomKey(e.target.value)}
                />

                <button type="submit">Enter</button>
            </form>
            <style jsx>{`
                form {
                    display: grid;
                    gap: 24px;
                }
            `}</style>
        </>
    )
}
