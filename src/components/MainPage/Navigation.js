import React from 'react'
import { NavHeader } from '../../layouts'
import { useSelector } from 'react-redux'

const Navigation = () => {
  const { authorizedUser } = useSelector((state) => state.users)
  return <NavHeader title='RecommendIt!' authorizedUser={authorizedUser} />
}

export default Navigation
