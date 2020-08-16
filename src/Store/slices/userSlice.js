import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'
import Cookies from 'js-cookie'

const initialState = {
  users: [],
  loading: false,
  authorizedUser: null,
  token: null,
  errorStatus: false,
  errorMessage: null,
  userSignedIn: false,
  userSignedOut: true
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    userLogIn: (state, action) => {
      const { user, token } = action.payload
      state.authorizedUser = user
      Cookies.set('authorizedUser', JSON.stringify(user), { expires: 1 })
      Cookies.set('token', JSON.stringify(token), { expires: 1 })
      state.loading = false
      state.userSignedIn = true
    },
    userLogOut: (state, action) => {
      Cookies.remove('authorizedUser')
      Cookies.remove('token')
      state.loading = false
      state.userSignedOut = true
      console.log('SignOut Successful')
    },
    createdUser: (state, action) => {
      console.log(action.payload)
      state.loading = false
    },
    gotUsers: (state, action) => {
      state.users = action.payload
      state.loading = false
    },
    gotUserById: (state, action) => {
      state.loading = false
    },
    updatedUser: (state, action) => {
      state.loading = false
    },
    deletedUser: (state, action) => {
      state.loading = false
    },
    updatedUserPhoto: (state, action) => {
      state.loading = false
    },
    forgotPassword: (state, action) => {
      state.loading = false
    },
    updatedUserPassword: (state, action) => {
      state.loading = false
    },
    sentConfirmEmail: (state, action) => {
      state.loading = false
    },
    confirmedUserEmail: (state, action) => {
      state.loading = false
    },
    userError: (state, action) => {
      state.errorStatus = true
      console.log(action.payload)
      state.loading = false
    }
  }
})

export const {
  userLogIn,
  userLogOut,
  createdUser,
  updatedUser,
  updatedUserPassword,
  updatedUserPhoto,
  gotUsers,
  gotUserById,
  deletedUser,
  forgotPassword,
  sentConfirmEmail,
  confirmedUserEmail,
  userError,
  toggleLoading
} = userSlice.actions
export default userSlice.reducer

/** USER METHODS */

// Login User, creates JWT Token and grabs user info
export const userLogin = (creds) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/login', 'POST', creds)
      const { user, error, token } = res.data
      if (error) {
        dispatch(userError(error))
      } else {
        dispatch(userLogIn(res.data))
      }
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// get Users

export const getUserById = () => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'GET', null, true, null)
      dispatch(gotUserById(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// create users
export const createUser = (user) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'POST', user)
      dispatch(createdUser(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// Update User
export const updateUser = (token, user) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'PUT', user, true, token)
      dispatch(updatedUser(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// Update User Photo

export const updateUserPhoto = (token, photoData) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/userphoto', 'POST', photoData, true, token)
      dispatch(updatedUserPhoto(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// Delete User
export const deleteUser = (token) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'DELETE', null, null, true, token)
      dispatch(deletedUser(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

/** RESET PASSWORD METHODS */

// sends user reset email password link via email
export const forgotUserPassword = (email) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/forgotpassword', 'POST', email)
      dispatch(forgotPassword(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

/** Allows user to update their password */

export const updateUserPassword = (user) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/updatepasswordviaemail', 'PUT', user)
      dispatch(updatedUserPassword(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}
/** CONFIRM USER EMAIL METHODS */

// sends conformation email to user
export const sendConfirmUserEmail = (email) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi(`/email`, email)
      dispatch(sentConfirmEmail(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// when user clicks on conformation email
export const confirmUserEmail = (id) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi(`/email/confirm/${id}`)
      dispatch(confirmedUserEmail(res.data))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}
