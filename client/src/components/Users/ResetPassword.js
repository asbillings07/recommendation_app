import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import { Form, Container, Row, Col } from 'react-bootstrap';

export default class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    update: false,
    isloading: true,
    error: '',
  };

  componentDidMount() {
    const { context } = this.props;
    const { token } = this.props.match.params;
    console.log(token);
    context.data
      .resetUserPassword(token)
      .then(user => {
        if (user) {
          this.setState({
            email: user.email,
            update: false,
            isloading: false,
          });
        } else {
          this.setState({
            update: false,
            isloading: false,
            error: 'Token is not valid',
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  render() {
    return;
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
}
