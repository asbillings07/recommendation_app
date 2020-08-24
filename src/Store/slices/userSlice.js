import { createSlice } from '@reduxjs/toolkit'
import { requestApi } from '../request'
import Cookies from 'js-cookie'
import swal from '@sweetalert/with-react'

const initialState = {
  users: [],
  user: {},
  userRecs: [],
  loading: false,
  authorizedUser: null,
  emailConfirmed: false,
  userEmail: null,
  token: null,
  confirmMessage: '',
  errorStatus: false,
  userSuccess: false,
  errorMessage: [],
  userSignedIn: false,
  userSignedOut: false,
  forgotEmailSent: false,
  sentConfEmail: false,
  userCreated: false
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    toggleUserSuccess: (state, action) => {
      state.userSuccess = action.payload
    },
    setUserCreated: (state, action) => {
      state.userCreated = action.payload
      state.userSuccess = true
    },
    setSentConfirmEmail: (state, action) => {
      state.sentConfEmail = action.payload
      state.userSuccess = true
    },
    setForgotEmailSent: (state, action) => {
      state.forgotEmailSent = action.payload
      state.loading = false
      swal({
        title: 'Forgotten password Email sent to your inbox',
        icon: 'success'
      })
    },
    userLogIn: (state, action) => {
      const { user, token } = action.payload
      state.authorizedUser = user
      Cookies.set('authorizedUser', JSON.stringify(user), { expires: 1 })
      Cookies.set('token', JSON.stringify(token), { expires: 1 })
      state.loading = false
      state.errorMessage = []
      state.userSignedIn = true
      state.userSignedOut = false
    },
    userLogOut: (state) => {
      Cookies.remove('authorizedUser')
      Cookies.remove('token')
      state.loading = false
      state.userSignedOut = true
      state.userSignedIn = false
      state.errorMessage = []
      console.log('SignOut Successful')
    },
    createdUser: (state, action) => {
      console.log(action.payload)
      state.loading = false
      state.userCreated = true
      state.userSuccess = true
      state.errorMessage = []
    },
    gotUsers: (state, action) => {
      state.users = action.payload
      state.loading = false
      state.errorMessage = []
    },
    gotUserById: (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      state.userRecs = action.payload.Recommendations
      state.emailConfirmed = action.payload.confirmed
      state.loading = false
      state.errorMessage = []
    },
    updatedUser: (state, action) => {
      state.loading = false
      state.errorMessage = []
      state.userSuccess = true
    },
    deletedUser: (state, action) => {
      state.loading = false
      state.errorMessage = []
      state.userSuccess = true
    },
    updatedUserPhoto: (state, action) => {
      state.loading = false
      state.errorMessage = []
      swal({
        title: 'Your photo has been successfully updated',
        icon: 'success'
      })
    },
    forgotPassword: (state, action) => {
      state.forgotEmailSent = action.payload.success
      state.loading = false
      state.errorMessage = []
      swal({
        title: 'Reset Password link successfully sent!',
        text: `A password reset link is heading to your inbox. Make sure you click the link with 24 hours or it will expire.`,
        icon: 'success'
      })
    },
    resetPassword: (state, action) => {
      console.log(action.payload)
      state.loading = false
      state.userEmail = action.payload.email
    },
    updatedUserPassword: (state, action) => {
      console.log(action.payload.message)
      state.loading = false
      state.userSuccess = true
      state.errorMessage = []
    },
    sentConfirmEmail: (state, action) => {
      state.confirmMessage = action.payload.message
      state.loading = false
      state.errorMessage = []
      state.sentConfEmail = true
      swal({
        title: 'Confirmation Email sent to your inbox',
        icon: 'success'
      })
    },
    confirmedUserEmail: (state, action) => {
      const { message } = action.payload
      state.confirmMessage = message
      state.loading = false
      state.errorMessage = []
    },
    userError: (state, action) => {
      console.log('ERROR', action.payload)
      const { message, error } = action.payload
      state.errorStatus = true
      state.errorMessage = [message || error || action.payload]
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
  setResetSuccess,
  gotUserById,
  deletedUser,
  resetPassword,
  setUserCreated,
  setSentConfirmEmail,
  forgotPassword,
  sentConfirmEmail,
  confirmedUserEmail,
  userError,
  setForgotEmailSent,
  toggleLoading,
  toggleUserSuccess
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
        dispatch(userLogIn({ user, token }))
      }
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}

export const userLogout = () => {
  return (dispatch) => {
    dispatch(toggleLoading())
    dispatch(userLogOut())
  }
}

// get Users

export const getUserById = (token) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'GET', null, true, token)
      dispatch(gotUserById(res.data))
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}

// create users
export const createUser = (user) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'POST', user)
      const { message } = res.data
      console.log(res)
      if (message.includes('Created Successfully')) {
        dispatch(createdUser(res.data))
        dispatch(setUserCreated(false))
      }
    } catch (error) {
      console.log('User Error', error)
      dispatch(userError(error.response.data))
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
      dispatch(toggleUserSuccess(false))
    } catch (error) {
      dispatch(userError(error.response.data.message))
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
      dispatch(toggleUserSuccess(false))
    } catch (error) {
      dispatch(userError(error.response.data.message))
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
      dispatch(userError(error.response.data.message))
    }
  }
}

/** RESET PASSWORD METHODS */

export const resetUserPassword = (token) => {
  const resetPassToken = {
    resetPasswordToken: token
  }
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/reset', 'GET', null, false, null, resetPassToken)
      dispatch(resetPassword(res.data))
    } catch (error) {
      dispatch(userError(error.response.data))
    }
  }
}

// sends user reset email password link via email
export const forgotUserPassword = (email) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/forgotpassword', 'POST', { email })
      dispatch(forgotPassword(res.data))
      dispatch(setForgotEmailSent(false))
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}

/** Allows user to update their password */

export const updateUserPassword = (user) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/updatepassword', 'PUT', user)
      dispatch(updatedUserPassword(res.data))
      dispatch(setResetSuccess(false))
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}
/** CONFIRM USER EMAIL METHODS */

// sends conformation email to user
export const sendConfirmUserEmail = () => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/email')
      dispatch(sentConfirmEmail(res.data))
      dispatch(setSentConfirmEmail(false))
    } catch (error) {
      dispatch(userError(error))
    }
  }
}

// when user clicks on conformation email
export const confirmUserEmail = (token) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi(`/email/confirm`, 'GET', null, true, token)
      console.log(res.data)
      dispatch(confirmedUserEmail(res.data))
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}
