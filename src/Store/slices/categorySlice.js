import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'
import swal from '@sweetalert/with-react'

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
      console.log(category)
      state.category = category.recommendations
      state.categoryId = category?.id ?? category._id
      state.loading = false
    },
    categoryError: (state, action) => {
      state.loading = false
      state.cateErrorStatus = true
      console.log(action.payload)
      // swal({
      //   title: 'Forgotten password Email sent to your inbox',
      //   icon: 'success'
      // })
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
      dispatch(categoryError(error?.response?.data ?? error))
    }
  }
}

export const getCategoryById = (id) => {
  return async (dispatch) => {
    try {
      const res = await requestApi(`/category/${id}`)
      dispatch(gotCategoryById(res.data))
    } catch (error) {
      dispatch(categoryError(error?.response?.data ?? error))
    }
  }
}

// createCategory
export const createCategory = (title) => {
  return async (dispatch) => {
    try {
      // const res = await requestApi('/category', 'POST', title)
    } catch (error) {
      dispatch(categoryError(error?.response?.data ?? error))
    }
  }
}
