const uuid = require('uuid');

class memoryStore {
    store = {}

    constructor() {
        this.store = {}
    }

    async createRoom(roomName, password, cardSet) {
        let room = this.store[roomName]

        // there is already a room named that
        if (room) {
            throw Error('nope!')
        }

        this.store[roomName] = new Room(roomName)
        room = this.store[roomName]

        room.password = password
        room.cardSet = cardSet

        return room
    }

    async ensureRoom(roomName) {
        const room = this.store[roomName]
        if (!room) {
            this.store[roomName] = new Room(roomName)
        }
        return this.store[roomName]
    }
}

class Room {
    room = ''
    users = {}
    revealed = false
    password = ''
    cardSet = ''
    id = uuid.v4()

    constructor(roomName) {
        this.room = roomName
        this.users = {}
        this.revealed = false
    }

    /**
     * Ensure that the user is there in the system
     * @param {string} userName
     */
    async ensureUser(userName) {
        this.users[userName] = { selection: 'none' }
        return this
    }

    async deleteUser(userName) {
        delete this.users[userName]
        return this
    }

    async select(userName, selection) {
        this.users[userName] = { selection }
        return this
    }

    async reveal() {
        this.revealed = true
        return this
    }

    async clearAllSelections() {
        this.revealed = false
        Object.keys(this.users).map((e) => {
            this.users[e] = { selection: 'none' }
        })
        return this
    }
}

module.exports = memoryStore
