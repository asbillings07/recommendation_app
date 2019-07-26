import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../Config';
import Axios from 'axios';
import UserForm from './UserForm';
import { Alert, Form, Container, Row, Col, Button } from 'react-bootstrap';

export default class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    update: false,
    isloading: true,
    error: false,
    errors: '',
  };

  async componentDidMount() {
    const { token } = this.props.match.params;
    console.log(token);
    await Axios.get(`${Config.apiBaseUrl}/reset`, {
      params: {
        resetPasswordToken: token,
      },
    }).then(res => {
      console.log(res);
      if (res.data.message === 'successful') {
        this.setState({
          email: res.data.email,
          update: false,
          isloading: false,
          error: false,
        });
      } else {
        this.setState({
          update: false,
          isloading: false,
          error: true,
          errors: 'Password Token Expired',
        });
      }
    });
  }

  render() {
    const { password, error, errors, isloading, updated } = this.state;
    if (error) {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <Alert variant="danger">
                <Alert.Heading>{errors}</Alert.Heading>
                <p>
                  Aww shoot! It looks like your reset password token has
                  expired. This usually happens if you wait too long to follow
                  the link in your email. No worries, you can still reset your
                  password with another token. Please press the link below to
                  get another reset password link. Remember your token does
                  expire within 24 hours.
                </p>
                <hr />
                <Alert.Link href="/forgotpassword" className="mb-0">
                  Reset Password
                </Alert.Link>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    } else if (isloading) {
      return null;
    } else {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <UserForm
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Password"
                elements={() => (
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      placeholder="password"
                      onChange={this.change}
                    />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>
        </Container>
      );
    }
  }

  submit = () => {};

  change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
