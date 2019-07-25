import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import { Form, Container, Row, Col } from 'react-bootstrap';

export default class ForgotPassword extends Component {
  state = {
    email: '',
    showError: false,
    messageFromServer: '',
  };

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

  Submit = e => {};

  cancel = () => {
    this.props.history.push('/');
  };
}
