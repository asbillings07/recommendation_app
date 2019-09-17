import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default function UpdateRecommendation({ context, match, history }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastVisted, setLastVisited] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [userid, setUserid] = useState('');
  const [errors, setErrors] = useState([]);
  const [confirmed] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { id } = match.params;
      const { authorizedUser } = context;
      try {
        const data = await Axios.get(`${Config.apiBaseUrl}/recs/${id}`);

        if (data) {
          const rec = data.data;
          setTitle(rec.title);
          setDescription(rec.description);
          setLastVisited(rec.lastVisted);
          setLocation(rec.location);
          setRating(rec.rating);
          setUserid(rec.userid);
        } else {
          throw new Error('Issue getting data');
        }
        console.log(authorizedUser.id);
        console.log(userid);
        if (authorizedUser) {
        } else {
          history.push('/forbidden');
        }
      } catch (err) {
        console.log(err);
        history.push('/error');
      }
    };

    getData();
  }, [context, history, match.params]);

  const submit = () => {
    const { id } = match.params;
    const { token, data } = context;
    const rec = { title, description, location };
    data
      .updateRecommendation(token, rec, id)
      .then(errors => {
        if (errors.length) {
          setErrors([errors]);
        } else {
          notify.show('Recommendation Updated!', 'success', 10000);
          history.push(`/profile`);
        }
      })
      .catch(error => console.log(error.message));
  };

  const cancel = () => {
    history.push(`/profile`);
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col xs md lg="auto">
          <>
            <h1 className="mb-4">Update Your Recommendation</h1>
            <Forms
              cancel={cancel}
              errors={errors}
              submit={submit}
              passwordErrors={confirmed}
              submitButtonText="Update Recommendation"
              elements={() => (
                <React.Fragment>
                  <Form.Group>
                    <Form.Control
                      aria-label="input the title of your recommendation here"
                      type="text"
                      name="title"
                      placeholder=""
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      aria-label="input the description of your recommendation here"
                      type="text"
                      name="description"
                      placeholder=""
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      aria-label="input the location of your recommendation here"
                      type="text"
                      name="location"
                      value={location}
                      placeholder=""
                      onChange={e => setLocation(e.target.value)}
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
}
