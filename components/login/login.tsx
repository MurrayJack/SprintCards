import { Box } from '../layouts/box'
import React, { useEffect, useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { Input } from '../controls/inputControl'
import { Button } from '../controls/button'
import { Form } from '../layouts/form'

export interface ILoginFormProps {
    roomName: string
    onEnterRoom: (userName: string) => void
}

export const Login = ({ roomName, onEnterRoom }: ILoginFormProps) => {
    const [userName, setUserName] = useState<string>()

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
        onEnterRoom(userName)
    }

    return (
        <Box title={`Enter Room: ${roomName}`}>
            <Form onSubmit={handleOnSubmit}>
                <Input
                    autoFocus
                    icon={FiUser}
                    placeholder="please enter your name"
                    label="Name"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <Button>Enter</Button>
            </Form>
        </Box>
    )
}
