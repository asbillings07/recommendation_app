import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import slices
import userSlice from './slices/userSlice'
import categorySlice from './slices/categorySlice'
import recSlice from './slices/recommendationSlice'
import commentSlice from './slices/commentSlice'
import ratingSlice from './slices/ratingSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['recs', 'comments', 'ratings']
}

const rootReducer = combineReducers({
  users: userSlice,
  categories: categorySlice,
  recs: recSlice,
  comments: commentSlice,
  ratings: ratingSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer
