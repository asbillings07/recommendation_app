import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from 'redux-persist'
import rootReducer from './rootReducer'

export const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE]
      },
      immutableCheck: false
    }).concat(logger)
  })
  const persistor = persistStore(store)
  return [store, persistor]
}
