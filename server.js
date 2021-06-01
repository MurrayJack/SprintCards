const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const memoryStore = require('./store/memoryStore')

let port = 8080
const menStore = new memoryStore()

nextApp.prepare().then(async () => {
    io.sockets.on('connection', async (socket) => {
        /**
         * Create a room for you to use
         */
        socket.on('create', async function ({ room, password, cardSet }) {
            menStore
                .createRoom(room, password, cardSet)
                .then((e) => socket.emit('create', { name: e.room, id: e.id }))
                .catch((e) => socket.emit('create_failed', 'room exists'))
        })

        socket.on('enter', async function ({ roomName, userName }) {
            socket.join(roomName)

            menStore
                .ensureRoom(roomName)
                .then((roomData) => roomData.ensureUser(userName))
                .then((roomData) => io.sockets.in(roomName).emit('update', roomData))
        })

        socket.on('selection', async ({ roomName, userName, selection }) => {
            socket.join(roomName)

            menStore
                .ensureRoom(roomName)
                .then((roomData) => roomData.select(userName, selection))
                .then((roomData) => io.sockets.in(roomName).emit('update', roomData))
        })

        socket.on('reveal', ({ roomName }) => {
            socket.join(roomName)

            menStore
                .ensureRoom(roomName)
                .then((roomData) => roomData.reveal())
                .then((roomData) => io.sockets.in(roomName).emit('update', roomData))
        })

        socket.on('kick', async ({ roomName, name }) => {
            socket.join(roomName)

            menStore
                .ensureRoom(roomName)
                .then((roomData) => roomData.deleteUser(name))
                .then((roomData) => io.sockets.in(roomName).emit('kick', { name, room: roomData }))
        })

        socket.on('clear', async ({ roomName }) => {
            socket.join(roomName)

            menStore
                .ensureRoom(roomName)
                .then((roomData) => roomData.clearAllSelections())
                .then((roomData) => io.sockets.in(roomName).emit('update', roomData))
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
