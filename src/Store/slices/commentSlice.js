import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'

const initialState = {
  loading: false
}

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    }
  }
})

export const { toggleLoading } = commentSlice.actions
export default commentSlice.reducer

/** Comment Methods */

const createComment = (token, id, comment) => {
  return async (dispatch) => {
    try {
      const res = await this.api(`/rec/${id}/comment`, 'POST', comment, true, token)
    } catch (error) {}
  }
}

const addUserComment = (comment, id) => {
  const commentQuery = {
    comment
  }
  return async (dispatch) => {
    try {
      const res = requestApi(`/rec/${id}/comment`, 'POST', null, false, commentQuery)
    } catch (error) {}
  }
}

export const updateComment = (token, id, comment) => {
  return async (dispatch) => {
    try {
      const res = await this.api(`/rec/${id}/comment`, 'PUT', comment, true, token)
    } catch (error) {}
  }
}

export const deleteComment = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await this.api(`/rec/${id}/comment`, 'DELETE', null, true, token)
    } catch (error) {}
  }
}
