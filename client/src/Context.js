import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
const Context = React.createContext();

/**
 * Class that Provides context
 * SignIn and SignOut Methods
 *
 */

export class Provider extends Component {
  data = new Data();

  state = {
    authorizedUser: Cookies.getJSON('authorizedUser') || null,
    token: Cookies.getJSON('token') || null,
  };

  render() {
    const { authorizedUser } = this.state;

    const value = {
      authorizedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /** SignIn Method - Signs in user and sets authorized user in cookies */

  signIn = async (email, password) => {
    const creds = { email, password };
    const user = await this.data.login(creds);
    if (user) {
      console.log(user);
      console.log(user.token);
      this.setState(() => {
        return {
          authorizedUser: user.user,
          token: user.token,
        };
      });
      Cookies.set('authorizedUser', JSON.stringify(user.user), { expires: 1 });
      Cookies.set('token', JSON.stringify(user.token), { expires: 1 });
    }
    return user;
  };

  /**SignOut Method - Signs out user and removes cookies */

  signOut = () => {
    this.setState({ authorizedUser: null, token: null });
    Cookies.remove('authorizedUser');
    Cookies.remove('token');
    console.log('SignOut Successful');
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
