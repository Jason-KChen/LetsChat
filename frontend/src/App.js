import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainRouter from './MainRouter';


class App extends Component {
  render() {
    return (
      <div className="App" style={{ 'backgroundColor': '#f7f7f7'}}>
        <nav style={{'backgroundColor': '#3b5998'}}>
          <div className="nav-wrapper">
            <a disabled className="brand-logo center">LetsChat</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a>Under Construction</a></li>
              <li><a>Version 0.1</a></li>
            </ul>
          </div>
        </nav>
        <MainRouter/>
      </div>
    );
  }
}

export default App;
