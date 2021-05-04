const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 80

let rooms = {}

io.sockets.on('connection', (socket) => {
    socket.on('room', function ({ room, user }) {
        socket.join(room)

        const cards = getARoom(room)

        cards.users[user] = { selection: 'none' }

        io.sockets.in(room).emit('message', `Welcome ${user} to ${room}`)
        io.sockets.in(room).emit('update', cards)
    })

    socket.on('selection', ({ room, user, selection }) => {
        const cards = getARoom(room)

        if (selection) {
            cards.users[user] = { selection }
        } else {
            cards.users[user] = { selection: 'none' }
        }

        console.log(room, user, selection, cards)

        io.sockets.in(room).emit('message', `User ${user} selected ${selection?.caption}`)
        io.sockets.in(room).emit('update', cards)
    })

    socket.on('reveal', ({ room, user }) => {
        io.sockets.in(room).emit('message', `User ${user} revealed ${room}`)
        io.sockets.in(room).emit('reveal')
    })

    socket.on('clear', ({ room, user }) => {
        const cards = getARoom(room)

        for (var property in cards.users) {
            if (cards.users.hasOwnProperty(property)) {
                cards.users[property] = { selection: 'none' }
            }
        }

        io.sockets.in(room).emit('message', `User ${user} cleared ${room}`)
        io.sockets.in(room).emit('update', cards)
    })
})

const getARoom = (room) => {
    if (!rooms[room]) {
        rooms[room] = {
            room,
            users: {},
        }
    }

    return rooms[room]
}

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
