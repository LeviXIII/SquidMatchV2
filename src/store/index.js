import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' //local storage.
import reducers from '../reducers';
import SearchReducer from '../reducers/SearchReducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loginReducer'], //exclude LoginReducer.
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer,
                                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                              );
export const persistor = persistStore(store);
// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return { store, persistor };
// }