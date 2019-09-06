import React, { useState, useEffect } from 'react';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import Axios from 'axios';
import { CreateRecListing } from './CreateRecListing';
import { RecommendationModal } from '../RecommendationModal';
export const CreateRecommendation = ({ context, match, history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastVisited, setLastVisited] = useState('');
  const [location, setLocation] = useState('');
  const [locationId, setLocationId] = useState('');
  const [recid, setRecid] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const [personCoordinates, setPersonCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [recommendationListing, setRecommendationListing] = useState([]);
  const [errors, setErrors] = useState('');
  const [confirmed, setConfirmed] = useState(true);

  /**
   * When user inputs name of place, options within a certain mile radius will show for the user.
   * The user can then click on one of these and it will fill out the address for them.
   *
   */

  useEffect(() => {
    const getUserPosition = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const userPostion = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setPersonCoordinates({
            lat: userPostion.lat,
            lng: userPostion.lng,
          });

          return userPostion;
        });
      } else {
        console.log('geolocation is not avaiable');
      }
    };
    getUserPosition();
  }, []);

  console.log(personCoordinates);

  const findPlace = e => {
    const place = e.target.value;

    if (place.length > 0) {
      Axios.get(`https://places.cit.api.here.com/places/v1/autosuggest`, {
        params: {
          at: `${personCoordinates.lat},${personCoordinates.lng}`,
          app_id: `${process.env.REACT_APP_ID}`,
          app_code: `${process.env.REACT_APP_CODE}`,
          q: place,
        },
      }).then(response => {
        console.log(response.data.results);
        setRecommendationListing(response.data.results);
      });
    }
  };

  const submit = () => {
    const { id } = match.params;
    const { token, data } = context;
    const rec = { title, description, location, lastVisited };
    data.createRecommendation(token, rec, id).then(errors => {
      if (errors) {
        setErrors(errors);
      } else {
        notify.show('Recommendation Created!', 'success', 10000);
        history.push(`/category/${id}/recs`);
      }
    });
  };

  const cancel = () => {
    const { id } = match.params;
    history.push(`/category/${id}/recs`);
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col xs md lg="auto">
          <h1>Create Your Recommendation!</h1>
          <Forms
            cancel={cancel}
            errors={errors}
            submit={submit}
            passwordErrors={confirmed}
            submitButtonText="Create Recommendation"
            elements={() => (
              <React.Fragment>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="What's the name of this place?"
                    onBlur={findPlace}
                  />
                  {/* <CreateRecListing
                      recommendationListing={this.state.recommendationListing}
                    /> */}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Tell others about what makes it great"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={e => setLocation(e.target.value)}
                  />
                </Form.Group>
              </React.Fragment>
            )}
          />
          <RecommendationModal
            shouldShow={shouldShow}
            recList={recommendationListing}
          />
        </Col>
      </Row>
    </Container>
  );

  /**
   *
   * <Modal
   * ShouldShow={}
   *  />
   */
};
