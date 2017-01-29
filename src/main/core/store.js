import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import actionReducer from './reducers/action.reducer';
import notificationReducer from './reducers/notification.reducer';
import accountReducer from './reducers/account.reducer';
import serverReducer from './reducers/server.reducer';
import tasksReducer from './reducers/tasks.reducer';
import weddingReducer from './reducers/wedding.reducer';
import actionBarReducer from './reducers/actionbar.reducer';
import loginSaga from './sagas/login.saga';
import editSaga from './sagas/edit.saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    action: actionReducer,
    notification: notificationReducer,
    form: formReducer,
    account: accountReducer,
    server: serverReducer,
    tasks: tasksReducer,
    wedding: weddingReducer,
    routing: routerReducer,
    actionBar: actionBarReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(editSaga);
