import React, { useEffect, useState } from 'react'
import { FiUser, FiHome } from 'react-icons/fi'
import { Input } from '../controls/inputControl'
import { useConnection } from '../../context/ConnectionContext'
import { Button } from '../controls/button'
import { Form } from '../layouts/form'

export const NewRoom = () => {
    const { connect, room, roomFromUrl } = useConnection()
    const [userName, setUserName] = useState<string>()
    const [roomKey, setRoomKey] = useState<string>()

    useEffect(() => {
        setRoomKey(room)

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
            <Form onSubmit={handleOnSubmit}>
                <Input
                    autoFocus
                    icon={FiUser}
                    placeholder="please enter your name"
                    label="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                {!roomFromUrl && (
                    <Input
                        autoFocus
                        icon={FiHome}
                        placeholder="please enter a room name"
                        label="Room"
                        value={roomKey}
                        onChange={(e) => setRoomKey(e.target.value)}
                    />
                )}

                {roomFromUrl && <p>Joining Room: {room}</p>}

                <Button>Enter</Button>
            </Form>
        </>
    )
}
