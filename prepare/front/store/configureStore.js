import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    console.log('디스패치', dispatch);
    console.log('겟스테이트', getState);
    console.log('액션', action);
    return next(action);
};

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware, loggerMiddleware];

    const enhancer = process.env.NODE_ENV === 'production' 
    ? compose(applyMiddleware(...middlewares)) // production 
    : composeWithDevTools(applyMiddleware(...middlewares)); // Development
    
    const store = createStore(reducer, enhancer);

    store.sagaTask = sagaMiddleware.run(rootSaga);
    
    return store;
};

const wrapper = createWrapper(configureStore, {
    //이 설정을 통해 개발시에 리덕스에 관해서 자세한 설명이 나옵니다.
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;