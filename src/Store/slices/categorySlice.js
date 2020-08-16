import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'

const initialState = {
  loading: false,
  cateErrorStatus: null,
  cateErrorMessage: null,
  categories: []
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    gotCategoryById: (state, action) => {
      state.categories = action.payload
      state.loading = false
    },
    categoryError: (state, action) => {
      state.loading = false
      state.cateErrorStatus = true
      console.log(action.payload)
    }
  }
})

export const { toggleLoading, categoryError, gotCategoryById } = categorySlice.actions
export default categorySlice.reducer

// get Category

export const getCategoryById = (id) => {
  return async (dispatch) => {
    try {
      const res = await requestApi(`/category/${id}`)
      dispatch(gotCategoryById(res.data))
    } catch (error) {
      dispatch(categoryError(error))
    }
  }
}

// createCategory
export const createCategory = (title) => {
  return async (dispatch) => {
    try {
      // const res = await requestApi('/category', 'POST', title)
    } catch (error) {
      dispatch(categoryError(error))
    }
  }
}
