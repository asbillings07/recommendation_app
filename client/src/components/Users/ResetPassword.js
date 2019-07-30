import React, { Component } from 'react';
import Config from '../../Config';
import Axios from 'axios';
import UserForm from './UserForm';
import { Alert, Form, Container, Row, Col } from 'react-bootstrap';
import Spinner from '../Spinner.js';

export default class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    isloading: true,
    error: false,
    errors: '',
    updated: false,
    confirmed: true,
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
          updated: false,
          isloading: false,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          isloading: false,
          error: true,
          errors: 'Password Token Expired',
        });
      }
    });
  }

  render() {
    const {
      password,
      updated,
      confirmPassword,
      error,
      errors,
      isloading,
      confirmed,
    } = this.state;
    if (error) {
      return (
        <Container className="mt-3">
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
      return <Spinner size="4x" spinning="spinning" />;
    } else if (updated) {
      return (
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <Alert variant="success">
                <Alert.Heading>Password Reset Successful</Alert.Heading>
                <p>
                  Your password has been reset succesfully. Follow the link to
                  sign in with your new password.
                </p>
                <hr />
                <Alert.Link href="/signin" className="mb-0">
                  Sign In
                </Alert.Link>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <h1>Reset Password</h1>
              <UserForm
                cancel={this.cancel}
                errors={errors}
                passwordErrors={confirmed}
                submit={this.submit}
                passwordErrors={confirmed}
                submitButtonText="Update Password"
                elements={() => (
                  <React.Fragment>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password"
                        onChange={this.change}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="confirm password"
                        onChange={this.change}
                      />
                    </Form.Group>
                  </React.Fragment>
                )}
              />
            </Col>
          </Row>
        </Container>
      );
    }
  }

  submit = () => {
    const { context } = this.props;
    const { email, password, confirmPassword } = this.state;
    const user = {
      email,
      password,
    };

    if (confirmPassword === password) {
      context.data.updateUserPassword(user).then(user => {
        console.log(user);
        if (user) {
          this.setState({
            updated: true,
          });
        } else {
          this.setState({
            error: true,
          });
        }
      });
    } else {
      this.setState({ errors: ['Passwords must match'] });
    }
  };

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
