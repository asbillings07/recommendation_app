import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'

const initialState = {
  loading: false,
  userRating: 0,
  ratingErrorStatus: null,
  ratingErrorMessage: [],
  updateRatingSuccess: false,
  createRatingSuccess: false,
  deleteRatingSuccess: false
}

const ratingSlice = createSlice({
  name: 'ratingSlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    toggleUserRating: (state, action) => {
      state.userRating = action.payload
    },
    toggleCreateRatingSuccess: (state, action) => {
      state.createRatingSuccess = action.payload
    },
    toggleUpdateRatingSuccess: (state, action) => {
      state.updateRatingSuccess = action.payload
    },
    toggleDeleteRatingSuccess: (state, action) => {
      state.deleteRatingSuccess = action.payload
    },
    gotUserRating: (state, action) => {
      state.rating = action.payload
      state.loading = false
    },
    createdUserRating: (state, action) => {
      state.loading = false
      state.createRatingSuccess = true
    },
    updatedUserRating: (state, action) => {
      state.loading = false
      state.updateRatingSuccess = true
    },
    deletedUserRating: (state, action) => {
      state.loading = false
      state.deleteRatingSuccess = true
    },
    ratingError: (state, action) => {
      const { error, message } = action.payload
      state.loading = false
      state.ratingErrorStatus = true
      state.ratingErrorMessage = message
    }
  }
})

export const {
  toggleLoading,
  gotUserRating,
  toggleCreateRatingSuccess,
  toggleDeleteRatingSuccess,
  toggleUpdateRatingSuccess,
  ratingError,
  toggleUserRating,
  deletedUserRating,
  updatedUserRating,
  createdUserRating
} = ratingSlice.actions
export default ratingSlice.reducer

/** RATING METHODS */

export const setUserRating = (rate) => {
  return (dispatch) => {
    dispatch(toggleUserRating(rate))
  }
}

// create rating

export const createRating = (token, rating, id) => {
  return async (dispatch) => {
    try {
      const res = await requestApi(`/rating/recs/${id}`, 'POST', rating, true, token)
      console.log('CreateRating', res)
      dispatch(createdUserRating(res.data))
      dispatch(toggleCreateRatingSuccess(false))
    } catch (error) {
      console.log('CreateUserRatingError', error)
    }
  }
}

export const getUserRating = (token) => {
  return async (dispatch) => {
    try {
      const res = await requestApi(`/rating`, 'GET', null, true, token)
      dispatch(gotUserRating(res.data))
    } catch (error) {
      console.log('getUserRatingError', error)
    }
  }
}

// update rating
export const updateUserRating = (token, rating, id) => {
  return async (dispatch) => {
    try {
      const res = await requestApi(`/rating/recs/${id}`, 'PUT', rating, true, token)
      console.log('UpdateRating', res)
      dispatch(updatedUserRating(res.data))
      dispatch(toggleUpdateRatingSuccess(false))
    } catch (error) {
      dispatch(ratingError(error.response.data))
    }
  }
}
// delete rating

export const deleteRating = (token, id) => {
  return async (dispatch) => {
    try {
      const res = await requestApi(`/rating/recs/${id}`, 'DELETE', null, true, token)
      dispatch(deletedUserRating(res.data))
      dispatch(toggleDeleteRatingSuccess(false))
    } catch (error) {
      console.log('DeleteUserRatingError', error)
    }
  }
}
