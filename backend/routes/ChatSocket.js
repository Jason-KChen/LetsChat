const io = require('socket.io')({
    path: '/chat-socket'
})

let setupHandlers = () => {
    io.on('connect', (socket) => {
        let username = socket.handshake.query.username

        // let everyone know someone just joined
        let newUserMessage = JSON.stringify({
            username: username
        })

        socket.broadcast.emit('new_user', newUserMessage)
        console.log(username +  ' connected')

        // let everyone know someone just left
        socket.on('disconnect', (reason) => {
            socket.broadcast.emit('user_left', JSON.stringify({
                username: username
            }))

            console.log(username + ' disconnected')
        })

        // propagate received message
        socket.on('new_message', (data) => {
            console.log('Message received: ' + data)
            socket.broadcast.emit('new_message', data)
        })

        // propagate typing notifications
        socket.on('someone_typing', (data) => {
            console.log('Forwarding a typing notification: ' + data)
            socket.broadcast.emit('someone_typing', data)
        })

    })
}

let initSocket = (httpServer) => {
    io.attach(httpServer, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    })

    setupHandlers()
}

module.exports = initSocket