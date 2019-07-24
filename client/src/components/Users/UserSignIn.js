import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  };

  render() {
    const { email, password, errors } = this.state;

    return <React.Fragment />;
  }

  change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { email, password } = this.state;

    context.actions
      .signIn(email, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return {
              errors: ['Sign-In was unsuccessful'],
            };
          });
        } else {
          this.props.history.push(from);
          console.log('User signed In successfully');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/errors');
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}

// create container styled component that centers text
