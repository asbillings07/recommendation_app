import React, { useState } from 'react'
import Data from './Data'
import Cookies from 'js-cookie'
export const Context = React.createContext()

/**
 * function that Provides context
 * SignIn and SignOut Methods
 *
 */

export const Provider = ({ children }) => {
  const data = new Data()

  const initalAuthState = Cookies.getJSON('authorizedUser') || null
  const initalTokenState = Cookies.getJSON('token') || null
  const [state, setState] = useState({
    authorizedUser: initalAuthState,
    token: initalTokenState
  })

  const signIn = async (email, password) => {
    const creds = { email, password }
    const user = await data.login(creds)
    // console.log(user)
    if (user) {
      setState({ authorizedUser: user.user, token: user.token })
      Cookies.set('authorizedUser', JSON.stringify(user.user), { expires: 1 })
      Cookies.set('token', JSON.stringify(user.token), { expires: 1 })
    }
    return user
  }

  /** SignOut Method - Signs out user and removes cookies */

  const signOut = () => {
    setState({ authorizedUser: null, token: null })
    Cookies.remove('authorizedUser')
    Cookies.remove('token')
    console.log('SignOut Successful')
  }

  const value = {
    authorizedUser: state.authorizedUser,
    token: state.token,
    data,
    actions: {
      signIn,
      signOut
    }
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const Consumer = Context.Consumer

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>{(context) => <Component {...props} context={context} />}</Context.Consumer>
    )
  }
}
