import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import slices

const persistConfig = {
  key: 'root',
  storage,
  blackList: []
}

const rootReducer = combineReducers({})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer
