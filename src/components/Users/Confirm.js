import React, { useState, useEffect } from 'react'
import { Spinner, AlertUser } from '../reusableComponents'
import { confirmUserEmail } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Confirm() {
  const dispatch = useDispatch()
  const { token, errorMessage, errorStatus, loading, confirmMessage, emailConfirmed } = useSelector(
    (state) => state.users
  )
  const [state, setState] = useState({
    isConfirmed: false,
    hasConfirmed: false,
    msgHeader: '',
    message: ''
  })

  // const getUserInfo = async () => {
  //   const data = await axios.get(`${Config.apiBaseUrl}/users`, {
  //     headers: { Authorization: 'bearer ' + context.token }
  //   })
  //   if (data) {
  //     setUserAlreadyConfirmed(data.data.confirmed)
  //     setConfirming(false)
  //   }
  // }
  useEffect(() => {
    if (!emailConfirmed) {
      dispatch(confirmUserEmail(token))
    }
  }, [token, dispatch, emailConfirmed])

  useEffect(() => {
    switch (confirmMessage) {
      case 'Your email is confirmed!':
        setState((state) => ({
          ...state,
          isConfirmed: true,
          hasConfirmed: false,
          message:
            'Yay! Your email is confirmed. Click the link below to go to your Profile or Home to browse categories.',
          msgHeader: confirmMessage
        }))
        break
      case 'Your email was already confirmed':
        setState((state) => ({
          ...state,
          isConfirmed: false,
          hasConfirmed: true,
          message:
            'Our records indicate that your email is already confirmed. Congrats, your email is valid! Click the links below to view recommendations or view your profile.',
          msgHeader: confirmMessage
        }))
        break
      default:
        break
    }
  }, [confirmMessage])

  // useEffect(() => {
  //   switch (confirmMessage) {
  //     case 'Could not find you!':
  //       setError(true)
  //     case 'Your email is confirmed!':
  //       setError(false)
  //   }
  // }, [])

  return (
    <>
      {errorStatus && <p>{errorMessage}</p>}
      {loading ? (
        <Spinner size='8x' spinning={'spinning'} />
      ) : (
        <AlertUser
          type='success'
          link='/profile'
          linkText='Go to profile'
          heading={state.msgHeader}
          text={state.message}
        />
      )}
    </>
  )
}
