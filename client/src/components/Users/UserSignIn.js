import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import styled from 'styled-components';
import { Form } from 'react-bootstrap/Form';
export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <FormContaner>
        <h1>Sign In</h1>
        <UserForm
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="name@example.com"
                  onChange={this.change}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.change}
                />
              </Form.Group>
            </React.Fragment>
          )}
        />

        <p>
          Don't have a user account? <Link to="/signup">Click here</Link> to
          sign up!
        </p>
      </FormContaner>
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

// div container styled component that centers form
const FormContaner = styled.div`
  display: flex;
  justify-content: center;
`;
