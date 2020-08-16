import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import slices
import userSlice from './slices/userSlice'
import categorySlice from './slices/categorySlice'

const persistConfig = {
  key: 'root',
  storage,
  blackList: ['userSlice', 'categorySlice']
}

const rootReducer = combineReducers({
  users: userSlice,
  categories: categorySlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer
