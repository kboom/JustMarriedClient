import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import accountReducer from './reducers/account.reducer';
import serverReducer from './reducers/server.reducer';
import loginSaga from './sagas/login.saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    account: accountReducer,
    server: serverReducer,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(loginSaga);
