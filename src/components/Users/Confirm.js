/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Config from '../../Config';

export default function Confirm({ context, match }) {
  const [confirming, setConfirming] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [userAlreadyConfimed, setUserAlreadyConfirmed] = useState([]);

  const confirmUser = () => {
    const { id } = match.params;
    context.data.confirmUserEmail(id).then(data => {
      console.log(data);
      if (data.data.message === 'Could not find you!') {
        setConfirming(false);
        setError(true);
        setMessage(data.data.message);
      } else if (data.data.message === 'Your email is confirmed!') {
        setConfirming(false);
        setError(false);
        setMessage(data.data.message);
      }
    });
  };

  const getUserInfo = async () => {
    const data = await axios.get(`${Config.apiBaseUrl}/users`, {
      headers: { Authorization: 'bearer ' + context.token },
    });
    if (data) {
      setUserAlreadyConfirmed(data.data.confirmed);
      setConfirming(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    confirmUser();
  }, []);

  if (confirming) {
    return <Spinner size="8x" spinning={'spinning'} />;
  } else if (error) {
    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <Alert variant="danger">
              <Alert.Heading>{message}</Alert.Heading>
              <p>
                Looks like we couldn't find you in our Database. Click the link
                below to sign up.
              </p>
              <hr />
              <Alert.Link href="/signup" className="mb-0">
                Sign Up
              </Alert.Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  } else if (context.authorizedUser) {
    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <Alert variant="success">
              <Alert.Heading>{message}</Alert.Heading>
              <p>
                Yay! Your email is confirmed. Click the link below to go to your
                Profile or Home to browse categories.
              </p>
              <hr />
              <Alert.Link href="/profile" className="mb-0">
                Profile
              </Alert.Link>
              <br />
              <Alert.Link href="/" className="mb-0">
                Home
              </Alert.Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  } else if (userAlreadyConfimed) {
    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <Alert variant="success">
              <Alert.Heading>Email Already Confirmed</Alert.Heading>
              <p>
                Our records indicate that your email is already confirmed.
                Congrats, your email is valid! Click the links below to view
                recommendations or view your profile.
              </p>
              <hr />
              <Alert.Link href="/" className="mb-0">
                Home
              </Alert.Link>
              <br />
              <Alert.Link href="/profile" className="mb-0">
                Profile
              </Alert.Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}
