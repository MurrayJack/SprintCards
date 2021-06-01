import React, { useState } from 'react'
import { useCreate } from '../../context/CreateContext'
import cardSets from '../../components/cardSets'
import { hri } from 'human-readable-ids'
import { Box } from '../../components/layouts/box'
import { Form } from '../../components/layouts/form'
import { Input } from '../../components/controls/inputControl'
import { FiLock, FiUser } from 'react-icons/fi'
import { Select } from '../../components/controls/select'
import { CgCardHearts } from 'react-icons/cg'
import { Button } from '../controls/button'

export const CreateRoom = () => {
    const { create } = useCreate()
    const [roomName, setRoomName] = useState(hri.random())
    const [password, setPassword] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault()

        create(roomName, '', '')
    }

    return (
        <Box title="Create a Room">
            <Form onSubmit={handleFormSubmit}>
                <Input
                    autoFocus
                    icon={FiUser}
                    placeholder="please enter your name"
                    label="Room Name"
                    value={roomName}
                    required
                    onChange={(e) => setRoomName(e.target.value)}
                />

                <Input
                    icon={FiLock}
                    placeholder="room password (optional)"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

                <Select icon={CgCardHearts} label="Card Set">
                    {cardSets.map((e) => (
                        <optgroup label={e.name}>
                            {e.cardSets.map((e) => (
                                <option>{e.name}</option>
                            ))}
                        </optgroup>
                    ))}
                </Select>

                <Button>Create Room</Button>
            </Form>
        </Box>
    )
}
