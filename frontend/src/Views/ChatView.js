import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

@inject('rootStore')
@observer
class ChatView extends Component {
    constructor (props) {
        super(props)
        this.chatStore = this.props.rootStore.chatStore
    }

    componentDidMount () {
        if (this.chatStore.username.length < 3) {
            return this.props.history.push('/start')
        }

        this.chatStore.initSocket()
        this.chatStore.setupHandler()
    }

    componentWillUnmount () {
        this.chatStore.tearDown()
    }

    render () {

        const messageEntries = this.chatStore.allMessages.length !== 0 ? (
            <div>
                {this.chatStore.allMessages.map((obj, index) => {
                    return (
                        <div key={index} className="card-panel grey lighten-5 z-depth-1" style={{ marginLeft: '5px', marginRight: '5px'}}>
                            <div className="row valign-wrapper" style={{ marginBottom: '0px'}}>
                                <div className="col s2">
                                    <i className="small material-icons">lightbulb_outline</i>
                                    {/* <img src="images/yuna.jpg" alt className="circle responsive-img" /> notice the "circle" class */}
                                </div>
                                <div className="col s10 left-align">
                                    <p className="black-text" style={{ fontSize: '1.5em', wordWrap: 'break-word'}}>
                                    {obj.author}: {obj.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        ) : (
            <div style={{fontSize: '2em', marginTop: '30px', marginBottom: '30px'}}>
                No messages...
            </div>
        )

        const messages = (
            <div className="col s12" style={{marginTop: '5px', display: 'block', height: '480px', overflow: 'auto'}}>
                {messageEntries}
            </div>)

        const input = (
            <div className='row' style={{ marginTop: '10px'}}>
                <form className='col s10'>
                    <div className='input-field'>
                        <input placeholder='Put it here' id='userInput' value={this.chatStore.chatMessage} onChange={(e) => this.chatStore.updateChatMessage(e)}/>
                        <label className='active' htmlFor='userInput'>What do you want to say?</label>
                    </div>
                </form>
                <div className='col s2' style={{ marginTop: '10px' }}>
                    <a className='waves-effect waves-light btn' disabled={this.chatStore.chatMessage.length === 0} onClick={() => this.chatStore.sendNewChatMessage()} >Submit</a>
                </div>
            </div>
        )

        const chatSpace = (
            <div style={{ paddingTop: '20px'}}>
                {messages}
                {input}
            </div>
        )

        return (
            <div className='container'>
                {chatSpace}
            </div>
        )
    }
}

export default ChatView