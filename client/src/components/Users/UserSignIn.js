import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import notify from 'react-notify-toast';

// convert to hooks at somepoint
export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: '',
    confirmed: true,
  };

  render() {
    const { email, password, errors, confirmed } = this.state;

    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <h1>Sign In</h1>

            <Forms
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              passwordErrors={confirmed}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      placeholder="name@example.com"
                      onChange={this.change}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      placeholder="password"
                      onChange={this.change}
                    />
                  </Form.Group>
                  <Form.Text className="text-muted mb-2">
                    <Link to="/forgotpassword">Forgot password?</Link>
                  </Form.Text>
                </React.Fragment>
              )}
            />

            <p>
              New to RecommendIt? <Link to="/signup">Sign up</Link>{' '}
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { email, password } = this.state;

    context.actions
      .signIn(email, password)
      .then(user => {
        if (user.message === 'ok') {
          this.props.history.push(from);
        } else {
          this.setState(() => {
            return {
              errors: [user.message],
            };
          });
        }
      })
      .catch(err => {});
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
