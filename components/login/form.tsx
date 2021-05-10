import React, { FC, useEffect, useState } from 'react'
import { FiUser, FiKey, FiHome } from 'react-icons/fi'
import { Input } from '../controls/inputControl'
import { hri } from 'human-readable-ids'
import { useConnection } from '../../context/ConnectionContext'
import axios from 'axios'

interface INewRoomProps {
    type: 'New' | 'Existing'
}

export const NewRoom = ({ type }: INewRoomProps) => {
    const { create, connect } = useConnection()

    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [roomKey, setRoomKey] = useState<string>(type === 'New' ? hri.random() : '')

    useEffect(() => {
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

        const req = await axios.get('/room', {
            headers: {
                userName,
                password,
            },
        })

        if (type === 'New') {
            create(roomKey, userName, password)
        } else {
            connect(roomKey, userName, password)
        }
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

                <Input
                    autoFocus
                    icon={FiKey}
                    placeholder="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">{type === 'New' ? 'Create' : 'Enter'}</button>
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
