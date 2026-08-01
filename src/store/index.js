import { configureStore, combineReducers} from "@reduxjs/toolkit";
import todoReducer from './todoSlice'
import userReducer from './userSlice'
import filterReducer from "./filterSlice";
import themeReducer from "./themeSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  todos: todoReducer,
  user: userReducer,
  filters: filterReducer,
  theme: themeReducer,
});

// const storage = {
//     getItem: (key) => Promise.resolve(localStorage.getItem(key)),
//     setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
//     removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
// }

// import storageSession from 'redux-persist/es/storage/session' 
import storage from 'redux-persist/es/storage'

const persistConfig = {
  key: 'root',
  storage,
  version: 2,
  whitelist: ['todos', 'user', 'filters', 'theme'], // Specify which slices to persist
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)