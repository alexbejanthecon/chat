import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from '../reducers/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import auth from "../reducers/auth";
import rootSagas from "../sagas/index";
import chatReducer from "../reducers/chat";

const rootReducer = combineReducers(
    { auth: authReducer, chat: chatReducer}
);
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);
const persistor = persistStore(store);

export {store, persistor} ;
