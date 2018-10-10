import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import App from './sites/App';

const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line no-underscore-dangle, object-curly-newline
        }) : compose; // eslint-disable-line object-curly-newline

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(
    reducers,
    typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : {}, // eslint-disable-line no-underscore-dangle
    enhancer
);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
