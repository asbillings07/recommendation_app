import React, { useState, useEffect } from 'react';
import Forms from '../Forms';
import { Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import Axios from 'axios';
import { RecommendationModal } from './RecommendationModal';
import styled from 'styled-components';
import city from '../../images/city.jpg';

export function CreateRecommendation({ context, match, history }) {
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
    padding-top: 50px;
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
    background-color: ${props => (props.secondary ? '#F25C05' : 'white')};
    opacity: 0.9;
    margin-top: 9px;
    padding-top: 25px;
    margin-left: 1em;
    height: 25em;
    text-align: center;
  `;

  /** State & Effect Hooks */

  const [description, setDescription] = useState();
  const [lastVisited, setLastVisited] = useState('');
  const [recommendation, setRecommendation] = useState({});
  const [shouldShow, setShouldShow] = useState(false);
  const [personCoordinates, setPersonCoordinates] = useState(null);
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
      }
    };
    getUserPosition();
  }, []);

  /** Helper Functions */

  const findPlace = e => {
    const place = e.target.value;

    if (place.length > 0) {
      Axios.get(`https://places.cit.api.here.com/places/v1/discover/search`, {
        params: {
          at: `${personCoordinates.lat},${personCoordinates.lng}`,
          app_id: `${process.env.REACT_APP_ID}`,
          app_code: `${process.env.REACT_APP_CODE}`,
          q: `${place}`,
          tf: 'plain',
          size: '5',
        },
      }).then(response => {
        setRecommendationListing(response.data.results.items);
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
  console.log(description);
  const cancel = () => {
    const { id } = match.params;
    history.push(`/category/${id}/recs`);
  };

  return (
    <DivContainer>
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <StyledCol secondary="true" sm={4}>
            <StyledH1>Create Your Recommendation!</StyledH1>
            <StyledP>
              Fill out the title field with the name of your recommended place,
              we will then search your location for that place. Then choose from
              the list in the modal. Then add why others should visit your
              recommendation. Once you're done hit 'Create Recommendation' and
              we will add it to the list so others can view it!{' '}
            </StyledP>
          </StyledCol>
          <StyledCol sm={7}>
            <StyledH4>Fill in the following information</StyledH4>
            <Forms
              cancel={cancel}
              errors={errors}
              submit={submit}
              passwordErrors={confirmed}
              submitButtonText="Create Recommendation"
              elements={() => (
                <>
                  <Form.Group>
                    {personCoordinates ? (
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter the name of your place"
                        onBlur={findPlace}
                      />
                    ) : (
                      <>
                        <Spinner animation="border" role="status">
                          <span className="sr-only">
                            Getting your location....
                          </span>
                        </Spinner>
                        <p>Getting your location....</p>
                      </>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="What's great about this place?"
                      defaultValue={description}
                      onBlur={e => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="lastVisted"
                      placeholder="When did you last visit this place?"
                      defaultValue={lastVisited}
                      onBlur={e => setLastVisited(e.target.value)}
                    />
                  </Form.Group>
                  <p>{recommendation.title}</p>
                  <p>{recommendation.vicinity}</p>
                </>
              )}
            />
            {/* <ButtonDiv>
              <StyledButton onClick={submit}>
                Create Recommendation
              </StyledButton>
              <StyledButton secondary="true" onClick={cancel}>
                Cancel
              </StyledButton>
            </ButtonDiv> */}

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
}
