import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/**
 * A component that checks if user is Authorized if not redirects them to signin.
 *
 */

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authorizedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: '/signin', state: { from: props.location } }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
