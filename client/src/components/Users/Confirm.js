import React, { Component } from 'react';
import Spinner from '../Spinner';
import { Alert, Container, Row, Col } from 'react-bootstrap';

export default class Confirm extends Component {
  state = {
    confirming: true,
    error: false,
    message: '',
  };

  componentDidMount() {
    const { context } = this.props;
    const { id } = this.props.match.params;

    context.data.confirmUserEmail(id).then(data => {
      console.log(data.data.message);
      if (data.data.message === 'Could not find you!') {
        this.setState({
          confirming: false,
          error: true,
          message: data.data.message,
        });
      } else if (data.data.message === 'Your email is confirmed!') {
        this.setState({
          confirming: false,
          error: false,
          message: data.data.message,
        });
      }
    });
  }

  render() {
    const { confirming, message, error } = this.state;

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
                  Looks like we couldn't find you in our Database. Click the
                  link below to sign up.
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
    } else if (this.context.authorizedUser) {
      return (
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <Alert variant="success">
                <Alert.Heading>{message}</Alert.Heading>
                <p>
                  Yay! Your email is confirmed. Click the link below to go to
                  your Profile or Home to browse categories.
                </p>
                <hr />
                <Alert.Link href="/profile" className="mb-0">
                  Profile
                </Alert.Link>
                <Alert.Link href="/" className="mb-0">
                  Home
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
              <Alert variant="success">
                <Alert.Heading>{message}</Alert.Heading>
                <p>
                  Yay! Your email is confirmed. Click the link below to sign in.
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
    }
  }
}
