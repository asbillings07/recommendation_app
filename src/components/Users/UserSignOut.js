import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../Store/slices/userSlice'
import { Redirect } from 'react-router-dom'

export default () => {
  const dispatch = useDispatch()
  dispatch(userLogout())

  return <Redirect to='/' />
}
