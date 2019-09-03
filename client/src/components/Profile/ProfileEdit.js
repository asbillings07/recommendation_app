import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Forms from '../Forms';
import axios from 'axios';
import Config from '../../Config';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

const ProfileEdit = ({ context, history }) => {
  const [errors, setErrors] = useState([]);
  const [confirmed] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // fetch data from database with JWT to get user info
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${Config.apiBaseUrl}/users`, {
        headers: { Authorization: 'bearer ' + context.token },
      });

      if (data) {
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setEmail(data.data.email);
      }
    };

    fetchData();
  }, [context.token]);

  // submits update user info to database
  const submit = () => {
    const profileInfo = {
      firstName,
      lastName,
      email,
    };
    context.data
      .updateUser(context.token, profileInfo)
      .then(errors => {
        if (errors.length) {
          setErrors([errors[0]]);
        } else {
          notify.show('Profile Updated!', 'success', 10000);
          history.push('/profile');
        }
      })
      .catch(error => console.log(error));
  };
  const cancel = () => {
    history.push(`/profile`);
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col xs md lg="auto">
          <>
            <h1 className="mb-4">Update Your Profile</h1>
            <Forms
              cancel={cancel}
              errors={errors}
              submit={submit}
              passwordErrors={confirmed}
              submitButtonText="Update Profile"
              elements={() => (
                <React.Fragment>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder=""
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder=""
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="email"
                      value={email}
                      placeholder=""
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            />
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
