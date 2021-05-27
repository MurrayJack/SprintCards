const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const redis = require('redis')
const bluebird = require('bluebird')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 8080

// bluebird.promisifyAll(redis.RedisClient.prototype)
// const cache = redis.createClient()
const store = {}

const cache = {
    setAsync: async (name, item) => {
        return (store[name] = JSON.parse(item))
    },
    getAsync: async (name) => {
        return JSON.stringify(store[name])
    },
}

async function createARoomAsync(room, user) {
    const data = {
        room,
        users: {},
    }
    data.users[user] = { selection: 'none' }

    await cache.setAsync(room, JSON.stringify(data))

    return data
}

async function joinARoomAsync(room, user) {
    const item = await cache.getAsync(room)

    let data
    if (!item) {
        data = await createARoomAsync(room, user)
    } else {
        data = JSON.parse(item)
    }

    data.users[user] = { selection: 'none' }

    await cache.setAsync(room, JSON.stringify(data))
    return data
}

async function getARoom(room) {
    const item = await cache.getAsync(room)
    return JSON.parse(item)
}

async function setARoom(room, cards) {
    store[room] = cards
    return JSON.parse(item)
}

nextApp.prepare().then(async () => {
    io.sockets.on('connection', async (socket) => {
        socket.on('create', async function ({ room, user }) {
            try {
                const data = await createARoomAsync(room, user)

                if (data) {
                    socket.join(room)
                    io.sockets.in(room).emit('message', `Welcome ${user} to ${room}`)
                    io.sockets.in(room).emit('inRoom', { room, user })
                } else {
                    socket.emit('message', 'cannot create room')
                }
            } catch (error) {
                socket.emit('message', error)
            }
        })

        socket.on('room', async function ({ room = 'room', user }) {
            socket.join(room)
            const cards = await joinARoomAsync(room, user)

            io.sockets.in(room).emit('message', `Welcome ${user} to ${room}`)
            io.sockets.in(room).emit('update', cards)
        })

        socket.on('selection', async ({ room, user, selection }) => {
            socket.join(room)
            const cards = await joinARoomAsync(room, user)

            if (selection) {
                cards.users[user] = { selection }
            } else {
                cards.users[user] = { selection: 'none' }
            }

            setARoom(room, cards)

            if (selection) {
                io.sockets.in(room).emit('message', `User ${user} selected ${selection}`)
            }
            io.sockets.in(room).emit('update', cards)
        })

        socket.on('reveal', ({ room, user }) => {
            io.sockets.in(room).emit('message', `User ${user} revealed ${room}`)
            io.sockets.in(room).emit('reveal')
        })

        socket.on('kick', async ({ room, name }) => {
            socket.join(room)

            const cards = await getARoom(room)

            delete cards.users[name]
            setARoom(room, cards)

            io.sockets.in(room).emit('message', `User ${name} kicked`)
            io.sockets.in(room).emit('kick', { name, cards })
        })

        socket.on('clear', async ({ room, user }) => {
            socket.join(room)
            const cards = await joinARoomAsync(room, user)

            for (var property in cards.users) {
                if (cards.users.hasOwnProperty(property)) {
                    cards.users[property] = { selection: 'none' }
                }
            }

            io.sockets.in(room).emit('message', `User ${user} cleared ${room}`)
            io.sockets.in(room).emit('clear', cards)
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
