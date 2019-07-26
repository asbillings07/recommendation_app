import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../Config';
import Axios from 'axios';
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

  async componentDidMount() {
    const { token } = this.props.match.params;
    console.log(token);
    await Axios.get(`${Config.apiBaseUrl}/reset`, {
      params: {
        resetPasswordToken: token,
      },
    })
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          this.setState({
            email: res.data.email,
            update: false,
            isloading: false,
          });
        } else if (res.data.status > 200) {
          this.setState({
            update: false,
            isloading: false,
            error: 'Invalid Token, please try to reset your password again.',
          });
        }
      })
      .catch(err => {
        console.log(err);
        // this.props.history.push('/error');
      });
  }

  render() {
    const { password, error, isloading, updated } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <UserForm
              cancel={this.cancel}
              errors={error}
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
