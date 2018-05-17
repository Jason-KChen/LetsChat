import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import RootStore from './Store/RootStore'

ReactDOM.render(
    <Provider rootStore={new RootStore()}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
