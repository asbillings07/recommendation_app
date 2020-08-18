import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { notify } from 'react-notify-toast'

/**
 * A component that checks if user is Authorized if not redirects them to signin.
 *
 */

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authorizedUser } = useSelector((state) => state.users)
  useEffect(() => {
    if (!authorizedUser) {
      notify.show('You need to sign in before you can access that page', 'warning', 2000)
    }
  }, [authorizedUser])
  return (
    <>
      {
        <Route
          {...rest}
          render={(props) =>
            authorizedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
            )
          }
        />
      }
    </>
  )
}
