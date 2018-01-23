import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App'
import reducer from './reducers'

import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'))
registerServiceWorker();
