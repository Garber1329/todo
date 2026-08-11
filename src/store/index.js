import { configureStore, combineReducers} from "@reduxjs/toolkit";
import todoReducer from './todoSlice'
import authReducer from './authUserSlice'
import filterReducer from "./filterSlice";
import themeReducer from "./themeSlice";
import usersReducer from "./usersSlice";
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

const appReducer = combineReducers({
  todos: todoReducer,
  auth: authReducer,
  filters: filterReducer,
  theme: themeReducer,
  users: usersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout" || action.type === "auth/sessionExpired"){
    storage.removeItem('persist:root')
    state = undefined
  }
  return appReducer(state, action);
}

// import storageSession from 'redux-persist/es/storage/session' 
import storage from 'redux-persist/es/storage'

const persistConfig = {
  key: 'root',
  storage,
  version: 2,
  whitelist: ['todos', 'auth', 'filters', 'theme'], // Specify which slices to persist
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