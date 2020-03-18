const app = require("express")()
const server = require("http").Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

let port = 80

let answers = {};

io.on('connect', socket => {
    socket.on("send result", ({ name, sp }) => {
        console.log({ name, sp })
        answers[name] = sp;
        socket.broadcast.emit('reply answers', answers);
    });

    socket.on("send clear", () => {
        for (var property in answers) {
            if (answers.hasOwnProperty(property)) {
                answers[property] = "0"
            }
        }
        socket.broadcast.emit('reply clear', answers)
    });

    socket.on('disconnect', data => {
        console.log(data)
        console.log('user disconnected!')
    })

    socket.on('send connection', ({ name }) => {
        answers[name] = "0"
        socket.broadcast.emit('reply connection', answers)
    })

    socket.on('send reveal', () => {
        socket.broadcast.emit('reply reveal')
    })
})

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})