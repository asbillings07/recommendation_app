import React, { Component } from 'react';
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
    const { email, messageFromServer } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <UserForm
              cancel={this.cancel}
              errors={messageFromServer}
              submit={this.submit}
              submitButtonText="Reset Password"
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email Address"
                      onChange={this.change}
                    />
                    <Form.Text className="text-muted">
                      If you exist in our database you will recieve a reset
                      password email
                    </Form.Text>
                  </Form.Group>
                </React.Fragment>
              )}
            />
            <p>
              Remember your password? <Link to="/signin">Sign In</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
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
    const { email } = this.state;
    context.data
      .forgotUserPassword(email)
      .then(user => {
        if (user) {
          this.setState({
            showError: false,
            messageFromServer: [
              'Recovery email on the way, please check your email to reset your password',
            ],
          });
        } else {
          this.setState({
            showError: true,
            messageFromServer: [
              'Email not found in our in Database, please try again',
            ],
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
