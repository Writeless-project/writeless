import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const persistConfig = {
    key: 'root',
    storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export const persistor = persistStore(store);

// export default function configureStore(preloadedState) {
//     return createStore(
//         rootReducer,
//         preloadedState,
//         applyMiddleware(
//             thunkMiddleware,
//             loggerMiddleware
//         )
//     )
// };