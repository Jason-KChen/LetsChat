import { observable, action } from 'mobx'
import io from 'socket.io-client'


class ChatStore {
    @observable lastReceivedTypingNotification = 0
    @observable lastSentTypingNotification = 0
    @observable chatMessage = ''
    @observable username = ''
    @observable allMessages = []
    @observable socket = null

    constructor (rootStore) {
        this.rootStore = rootStore
        this.BASE = 'http://localhost:4000'
    }

    @action initSocket () {
        if (this.socket === null) {
            this.socket = io(this.BASE, {
                path: '/chat-socket',
                query: {
                    username: this.username
                }
            })
        } else {
            this.socket.connect()
        }
    }

    @action tearDown () {
        console.log('about to disconnect')
        this.username = ''

        if (this.socket !== null) {
            this.socket.disconnect()
        }
    }

    @action setupHandler () {
        this.socket.on('new_user', (data) => {
            let parsedMessage = JSON.parse(data)

            window.toastr.info(parsedMessage.username + ' has joined.')
        })

        this.socket.on('user_left', (data) => {
            window.toastr.info(JSON.parse(data).username + ' has left.')
        })

        this.socket.on('new_message', (data) => {
            let parsedMessage = JSON.parse(data)

            this.allMessages.unshift({
                author: parsedMessage.author,
                content: parsedMessage.content
            })
        })

        this.socket.on('someone_typing', (data) => {
            let parsedMessage = JSON.parse(data)

            let newTimestamp = (new Date().getTime())

            if (newTimestamp - this.lastReceivedTypingNotification > 4000) {
                this.lastReceivedTypingNotification = newTimestamp
                window.toastr.info(parsedMessage.username + ' is typing...')
            }
        })
    }

    @action updateChatMessage (e) {
        let targetValue = e.target.value

        if (targetValue === null) {
            targetValue = ''
        } else {
            this.chatMessage = targetValue
        }

        let newTimestamp = (new Date().getTime())

        if (newTimestamp - this.lastSentTypingNotification > 4000) {
            this.lastSentTypingNotification = newTimestamp
            this.socket.emit('someone_typing', JSON.stringify({
                username: this.username
            }))
        }
    }

    @action sendNewChatMessage () {

        let newMessageEntry = {
            author: this.username,
            content: this.chatMessage
        }

        this.socket.emit('new_message', JSON.stringify(newMessageEntry))
        this.allMessages.unshift(newMessageEntry)
        this.chatMessage = ''
    }

    @action nicknameChange (e) {
        this.username = e.target.value
    }
}

export default ChatStore