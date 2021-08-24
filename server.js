const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({
    dev
})
const nextHandler = nextApp.getRequestHandler()
const memoryStore = require('./store/memoryStore')

let port = 8080
const menStore = new memoryStore()

nextApp.prepare().then(async () => {
    io.sockets.on('connection', async (socket) => {
        socket.on('create', async function ({
            room,
            user
        }) {})

        socket.on('room', async function ({
            room = 'room',
            user
        }) {
            socket.join(room)

            menStore
                .ensureRoom(room)
                .then((roomData) => roomData.ensureUser(user))
                .then((roomData) => {
                    io.sockets.in(room).emit('update', roomData)
                    io.sockets.in(room).emit('message', `Welcome ${user} to ${room}`)
                })
        })

        socket.on('selection', async ({
            room,
            user,
            selection
        }) => {
            socket.join(room)

            menStore
                .ensureRoom(room)
                .then((roomData) => roomData.select(user, selection))
                .then((roomData) => {
                    io.sockets.in(room).emit('update', roomData)
                    io.sockets.in(room).emit('message', `User ${user} selected ${selection}`)
                })
        })

        socket.on('reveal', ({
            room,
            user
        }) => {
            menStore
                .ensureRoom(room)
                .then((roomData) => roomData.reveal())
                .then((roomData) => {
                    io.sockets.in(room).emit('update', roomData)
                    io.sockets.in(room).emit('message', `User ${user} revealed ${room}`)
                })
        })

        socket.on('kick', async ({
            room,
            name
        }) => {
            socket.join(room)

            menStore
                .ensureRoom(room)
                .then((roomData) => roomData.deleteUser(name))
                .then((roomData) => {
                    io.sockets.in(room).emit('kick', {
                        name,
                        room: roomData
                    })
                    io.sockets.in(room).emit('message', `User ${name} kicked`)
                })
        })

        socket.on('clear', async ({
            room,
            user
        }) => {
            socket.join(room)

            menStore
                .ensureRoom(room)
                .then((roomData) => roomData.clearAllSelections())
                .then((roomData) => {
                    io.sockets.in(room).emit('update', roomData)
                    io.sockets.in(room).emit('message', `User ${user} cleared ${room}`)
                })
        })

        socket.on('card-set', async ({
            room,
            cardSet
        }) => {
            socket.join(room)

            menStore
                .ensureRoom(room)
                .then((roomData) => roomData.changeCardSet(cardSet))
                .then((roomData) => {
                    io.sockets.in(room).emit('update', roomData)
                })
                .catch((error) => {
                    io.sockets.in(room).emit('error', error)
                })
        })


    })

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})