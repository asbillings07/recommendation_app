import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Forms from '../Forms';
import axios from 'axios';
import Config from '../../Config';
import { Form, Container, Row, Col } from 'react-bootstrap';

const ProfileEdit = ({ context, history }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [errors, setErrors] = useState([]);
  const [confirmed, setConfirmed] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${Config.apiBaseUrl}/users`, {
        headers: { Authorization: 'bearer ' + context.token },
      });

      if (data) {
        setProfileInfo(data.data);
      }
    };

    fetchData();
  }, [context.token]);

  const submit = () => {};
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
                      value={profileInfo.firstName}
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder=""
                      value={profileInfo.lastName}
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="email"
                      value={profileInfo.email}
                      placeholder=""
                      onChange={e => setName(e.target.value)}
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
