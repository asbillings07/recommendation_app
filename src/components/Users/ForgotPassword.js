import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Forms from '../Forms';
import { Alert, Form, Container, Row, Col } from 'react-bootstrap';

export default function ForgotPassword({ context, history }) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState('');
  const [confirmed] = useState(true);

  const submit = () => {
    context.data
      .forgotUserPassword(email)
      .then(() => setSuccess(true))
      .catch(err => {
        if (err) {
          setMessageFromServer([
            'Email does not exist in our Database, check your email and try again',
          ]);
        }
        console.log(err);
      });
  };

  const cancel = () => {
    history.push('/');
  };

  if (!success) {
    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <h1>Forgot Password?</h1>
            <Forms
              cancel={cancel}
              errors={messageFromServer}
              submit={submit}
              passwordErrors={confirmed}
              submitButtonText="Reset Password"
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email Address"
                      onChange={e => setEmail(e.target.value)}
                    />
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
  } else {
    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <Alert variant="success">
              <Alert.Heading>
                Reset Password Link Successfully Sent
              </Alert.Heading>
              <p>
                YAY! Your password reset link is heading to your inbox. Make
                sure you click the link with 24 hours or it will expire.
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}
