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
  userEmail: null,
  token: null,
  errorStatus: false,
  errorMessage: [],
  userSignedIn: false,
  userSignedOut: false,
  resetSuccess: false,
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
    setUserCreated: (state, action) => {
      state.userCreated = action.payload
    },
    setSentConfirmEmail: (state, action) => {
      state.sentConfEmail = action.payload
    },
    setResetSuccess: (state, action) => {
      state.resetSuccess = action.payload
    },
    setForgotEmailSent: (state, action) => {
      state.forgotEmailSent = action.payload
      state.loading = false
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
      state.loading = false
      state.errorMessage = []
    },
    updatedUser: (state, action) => {
      state.loading = false
      state.errorMessage = []
    },
    deletedUser: (state, action) => {
      state.loading = false
      state.errorMessage = []
    },
    updatedUserPhoto: (state, action) => {
      state.loading = false
      state.errorMessage = []
    },
    forgotPassword: (state, action) => {
      state.forgotEmailSent = true
      state.loading = false
      state.errorMessage = []
    },
    resetPassword: (state, action) => {
      state.loading = false
      state.userEmail = action.payload
    },
    updatedUserPassword: (state, action) => {
      console.log(action.payload)
      state.loading = false
      state.resetSuccess = true
      state.errorMessage = []
    },
    sentConfirmEmail: (state, action) => {
      state.loading = false
      state.errorMessage = []
      state.sentConfEmail = true
      swal({
        title: 'Confirmation Email sent to your inbox',
        icon: 'success'
      })
    },
    confirmedUserEmail: (state, action) => {
      state.loading = false
      state.errorMessage = []
    },
    userError: (state, action) => {
      const { message, errors } = action.payload
      state.errorStatus = true
      state.errorMessage = [message]
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
        dispatch(userLogIn({ user, token }))
      }
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}

export const userLogout = () => {
  return (dispatch) => {
    dispatch(userLogOut())
  }
}

// get Users

export const getUserById = () => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi('/users', 'GET', null, true)
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
    try {
      const res = requestApi('/reset', 'GET', null, false, null, resetPassToken)
      const { email, message } = res.data
      if (message === 'successful') {
        dispatch(resetPassword(email))
      } else {
        console.log(res)
        dispatch(userError('Password Token Expired'))
      }
    } catch (error) {
      dispatch(userError(error.response.data.message))
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
      const res = await requestApi('/updatepasswordviaemail', 'PUT', user)
      dispatch(updatedUserPassword(res))
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
export const confirmUserEmail = (id) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await requestApi(`/email/confirm/${id}`)
      dispatch(confirmedUserEmail(res.data))
    } catch (error) {
      dispatch(userError(error.response.data.message))
    }
  }
}
