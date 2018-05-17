import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

@inject('rootStore')
@observer
class PickUsernameView extends Component {
    constructor (props) {
        super(props)
        this.chatStore = this.props.rootStore.chatStore
    }

    render () {

        return (
            <div className='container'>
                <div className='row'>
                    <p style={{ fontSize: '2em'}}>
                        Enter your nickname to join!
                    </p>
                </div>

                <div style={{ paddingTop: '20px'}}>
                    <div className='row' style={{ marginTop: '10px'}}>
                        <form className='col s6 offset-s3'>
                            <div className='input-field'>
                                <input placeholder='Put it here' id='username' value={this.chatStore.username} onChange={(e) => this.chatStore.nicknameChange(e)}/>
                                <label className='active' htmlFor='username'>What is your nickname?</label>
                            </div>
                        </form>
                    </div>
                    <div className='row'>
                        <div className='col s4 offset-s4' style={{ marginTop: '10px' }}>
                            <a className='waves-effect waves-light btn' disabled={this.chatStore.username.length < 3} onClick={() => {
                                this.props.history.push('/chat')
                            }}>Join</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PickUsernameView