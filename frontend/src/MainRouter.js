import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import ChatView from './Views/ChatView';
import PickUsernameView from './Views/PickUsernameView';

@inject('rootStore')
@observer
class MainRouter extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path='/chat' component={ChatView}/>
                        <Route exact path='/start' component={PickUsernameView}/>
                        {/* <Route exact path='/' component={}/> */}
                    </div>
                    
                </Router>
            </div>
        )
    }
}

export default MainRouter