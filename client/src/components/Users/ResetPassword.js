import React, { useState, useEffect } from 'react';
import Config from '../../Config';
import Axios from 'axios';
import Forms from '../Forms';
import { Alert, Form, Container, Row, Col } from 'react-bootstrap';
import Spinner from '../Spinner.js';

export default function ResetPassword({ match, context, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState('');
  const [updated, setUpdated] = useState(false);
  const [confirmed] = useState(true);

  const resetUserPassword = async () => {
    const { token } = match.params;
    console.log(token);
    await Axios.get(`${Config.apiBaseUrl}/reset`, {
      params: {
        resetPasswordToken: token,
      },
    }).then(res => {
      console.log(res);
      if (res.data.message === 'successful') {
        setEmail(res.data.email);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(true);
        setErrors('Password Token Expired');
      }
    });
  };

  // run our function as soon as the browser loads
  useEffect(() => {
    resetUserPassword();
  }, []);

  // helper functions

  const submit = () => {
    const user = {
      email,
      password,
    };

    if (confirmPassword === password) {
      context.data.updateUserPassword(user).then(user => {
        console.log(user);
        if (user) {
          setUpdated(true);
        } else {
          setError(true);
        }
      });
    } else {
      setErrors({ errors: ['Passwords must match'] });
    }
  };

  const cancel = () => {
    history.push('/');
  };

  if (error) {
    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <Alert variant="danger">
              <Alert.Heading>{errors}</Alert.Heading>
              <p>
                Aww shoot! It looks like your reset password token has expired.
                This usually happens if you wait too long to follow the link in
                your email. No worries, you can still reset your password with
                another token. Please press the link below to get another reset
                password link. Remember your token does expire within 24 hours.
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
  } else if (isLoading) {
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
            <Forms
              cancel={cancel}
              errors={errors}
              passwordErrors={confirmed}
              submit={submit}
              submitButtonText="Update Password"
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      placeholder="password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      placeholder="confirm password"
                      onChange={e => setConfirmPassword(e.target.value)}
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
