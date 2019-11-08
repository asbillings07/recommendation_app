import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';

export default function UserSignIn({ context, history, location }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [confirmed] = useState(true);

  const submit = () => {
    const { from } = location.state || { from: { pathname: '/' } };

    try {
      context.actions.signIn(email, password).then(user => {
        if (user.message === 'ok') {
          history.push(from);
        } else {
          setErrors([user.message]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = () => {
    history.push('/');
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col xs md lg="auto">
          <h1>Sign In</h1>

          <Forms
            cancel={cancel}
            errors={errors}
            submit={submit}
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
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
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
