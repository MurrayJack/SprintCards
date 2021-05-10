const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const redis = require('redis')
const bluebird = require('bluebird')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 80

bluebird.promisifyAll(redis.RedisClient.prototype)
const cache = redis.createClient()

async function createARoomAsync(room, user, password) {
    const item = await cache.getAsync(room)
    if (!item) {
        const data = {
            room,
            password,
            users: {},
        }
        data.users[user] = { selection: 'none' }

        await cache.setAsync(room, JSON.stringify(data))
        return data
    }

    return undefined
}

async function joinARoomAsync(room, user, password) {
    const item = await cache.getAsync(room)
    const data = JSON.parse(item)

    data.users[user] = { selection: 'none' }

    await cache.setAsync(room, JSON.stringify(data))
    return data
}

async function getRoomInfoAsync() {
    //const item = await cache.getAsync(room)
}

nextApp.prepare().then(async () => {
    io.sockets.on('connection', async (socket) => {
        socket.on('create', async function ({ room, user, password }) {
            try {
                const data = await createARoomAsync(room, user, password)

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

        socket.on('room', async function ({ room = 'room', user, password }) {
            socket.join(room)

            const cards = await joinARoomAsync(room, user, password)

            io.sockets.in(room).emit('message', `Welcome ${user} to ${room}`)
            io.sockets.in(room).emit('update', cards)
        })

        socket.on('selection', ({ room, user, password, selection }) => {
            // const cards = getARoom(room)
            // if (selection) {
            //     cards.users[user] = { selection }
            // } else {
            //     cards.users[user] = { selection: 'none' }
            // }
            // console.log(room, user, selection, cards)
            // if (selection) {
            //     io.sockets.in(room).emit('message', `User ${user} selected ${selection.caption}`)
            // }
            // io.sockets.in(room).emit('update', cards)
        })

        socket.on('reveal', ({ room, user }) => {
            io.sockets.in(room).emit('message', `User ${user} revealed ${room}`)
            io.sockets.in(room).emit('reveal')
        })

        socket.on('clear', ({ room, user }) => {
            // const cards = getARoom(room)

            // for (var property in cards.users) {
            //     if (cards.users.hasOwnProperty(property)) {
            //         cards.users[property] = { selection: 'none' }
            //     }
            // }

            io.sockets.in(room).emit('message', `User ${user} cleared ${room}`)
            io.sockets.in(room).emit('update', cards)
        })
    })

    app.get('/room', (req, res) => {
        // test the username and password
        res.write("ok")
    }) 

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
