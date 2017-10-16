import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter as Router} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
const history = createHistory();
ReactDOM.render(<Provider store={store(history)}><Router history={history}><App history={history} />
</Router></Provider>, document.getElementById('root'));
registerServiceWorker();
