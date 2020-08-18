import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'

const initialState = {
  loading: false,
  recs: [],
  recErrorStatus: false,
  recErrorMessage: [],
  recCreated: false,
  recUpdated: false,
  recDeleted: false
}

const recSlice = createSlice({
  name: 'recSlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    toggleRecCreated: (state, action) => {
      state.recCreated = action.payload
    },
    toggleRecUpdated: (state, action) => {
      state.recUpdated = action.payload
    },
    toggleRecDeleted: (state, action) => {
      state.recDeleted = action.payload
    },
    recError: (state, action) => {
      console.log('ACTION ERRORs', action.payload)
      state.loading = false
      state.recErrorMessage = action.payload.errors
      state.recErrorStatus = true
    },
    createRec: (state, action) => {
      state.recCreated = true
    },
    updateRec: (state, action) => {
      state.recUpdated = true
    },
    deleteRec: (state, action) => {
      state.recDeleted = true
    }
  }
})

const {
  toggleLoading,
  recError,
  deleteRec,
  updateRec,
  createRec,
  toggleRecCreated,
  toggleRecDeleted,
  toggleRecUpdated
} = recSlice.actions
export default recSlice.reducer

/** RECOMMENDATION METHODS */

// create recommendation
export const createRecommendation = (token, rec, id) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      await requestApi(`/recs/category/${id}`, 'POST', rec, true, token)
      dispatch(createRec())
      dispatch(toggleRecCreated(false))
    } catch (error) {
      dispatch(recError(error.response.data))
    }
  }
}

// Update Recommendation
export const updateRecommendation = (token, rec, id) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi(`/recs/${id}`, 'PUT', rec, true, token)
      console.log('updateRec', res)
      // dispatch(updateRec())
      // dispatch(toggleRecUpdated())
    } catch (error) {
      dispatch(recError(error))
    }
  }
}

// Delete Recommendation

export const deleteRecommendation = (token, id) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi(`/recs/${id}`, 'DELETE', null, true, token)
      console.log('Delete Rec', res)
      // dispatch(deleteRec())
      // dispatch(toggleRecDeleted())
    } catch (error) {
      dispatch(recError(error))
    }
  }
}
