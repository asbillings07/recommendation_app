import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'

const initialState = {
  loading: false,
  cateErrorStatus: null,
  cateErrorMessage: null,
  category: [],
  categories: [],
  categoryId: null
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    gotAllCategories: (state, action) => {
      state.categories = action.payload
      state.loading = false
    },
    gotCategoryById: (state, action) => {
      const { category } = action.payload
      state.category = category.recommendations
      state.categoryId = category._id
      state.loading = false
    },
    categoryError: (state, action) => {
      state.loading = false
      state.cateErrorStatus = true
      console.log(action.payload)
    }
  }
})

export const {
  toggleLoading,
  categoryError,
  gotCategoryById,
  gotAllCategories
} = categorySlice.actions
export default categorySlice.reducer

// get Category

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const res = await requestApi('/category')
      dispatch(gotAllCategories(res.data.category))
    } catch (error) {
      dispatch(categoryError(error))
    }
  }
}

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
