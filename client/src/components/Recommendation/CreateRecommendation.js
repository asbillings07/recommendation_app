import React, { useState, useEffect } from 'react';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import Axios from 'axios';
import { RecommendationModal } from '../RecommendationModal';
import styled from 'styled-components';
import city from '../../images/city.jpg';

export const CreateRecommendation = ({ context, match, history }) => {
  /**Styled Components */

  const DivContainer = styled.div`
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-image: url(${city});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: -16px;
  `;

  const StyledH1 = styled.h1`
    color: white;
  `;
  const StyledP = styled.p`
    color: white;
  `;
  const StyledH4 = styled.h4`
    color: #0b438c;
  `;
  const StyledCol = styled(Col)`
    background: white;
    opacity: 0.9;
    margin-top: 9px;
    text-align: center;
  `;

  /** State & Effect Hooks */

  const [description, setDescription] = useState('');
  const [lastVisited, setLastVisited] = useState('');
  const [recommendation, setRecommendation] = useState({});
  const [recid, setRecid] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const [personCoordinates, setPersonCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [recommendationListing, setRecommendationListing] = useState([]);
  const [errors, setErrors] = useState('');
  const [confirmed] = useState(true);

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
        });
      } else {
        console.log('geolocation is not avaiable');
      }
    };
    getUserPosition();
  }, []);

  console.log(personCoordinates);

  /** Helper Functions */

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
        setShouldShow(true);
      });
    }
  };

  const submit = () => {
    const { id } = match.params;
    const { token, data } = context;
    const title = recommendation.title;
    const location = recommendation.vicinity;
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
    <DivContainer>
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col sm={5}>
            <StyledH1>Create Your Recommendation!</StyledH1>
            <StyledP>
              Fill out the title field with the name of your recommended place,
              we will then search your location for that place. Then choose from
              the list in the modal. Then add why others should visit your
              recommendation. Once you're done hit 'Create Recommendation' and
              we will add it to the list so others can view it!{' '}
            </StyledP>
          </Col>
          <StyledCol sm={7}>
            <StyledH4>Fill in the following information</StyledH4>
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
                      placeholder="Put in the name of your place"
                      onBlur={findPlace}
                    />
                    {console.log(recommendation)}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="What's the name of this place?"
                      value={recommendation.title || ''}
                      readOnly
                    />
                    {console.log(recommendation)}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={recommendation.vicinity || ''}
                      readOnly
                    />
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
                </React.Fragment>
              )}
            />
            <RecommendationModal
              shouldShow={shouldShow}
              setShow={setShouldShow}
              recList={recommendationListing}
              setRec={setRecommendation}
            />
          </StyledCol>
        </Row>
      </Container>
    </DivContainer>
  );
};
