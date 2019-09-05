import React, { Component } from 'react';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import Axios from 'axios';
import { CreateRecListing } from './CreateRecListing';
export default class CreateRecommendation extends Component {
  state = {
    title: '',
    description: '',
    lastVisited: '',
    location: '',
    query: '',
    rating: '',
    userid: '',
    locationId: '',
    recid: '',
    personCoordinates: { lat: null, lng: null },
    recommendationListing: [],
    errors: [],
    confirmed: true,
  };

  /**
   * When user inputs name of place, options within a certain mile radius will show for the user.
   * The user can then click on one of these and it will fill out the address for them.
   *
   */

  componentDidMount() {
    this.getUserPosition();
  }

  getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const userPostion = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({
          personCoordinates: {
            lat: userPostion.lat,
            lng: userPostion.lng,
          },
        });
        console.log(userPostion);
        return userPostion;
      });
    } else {
      console.log('geolocation is not avaiable');
    }
  };

  findPlace = e => {
    const { personCoordinates } = this.state;
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
        this.setState({
          recommendationListing: response.data.results,
        });
      });
    }
  };

  render() {
    const {
      title,
      description,
      location,
      errors,
      confirmed,
      lastVisited,
      rating,
      recid,
    } = this.state;

    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <h1>Create Your Recommendation!</h1>
            <Forms
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              passwordErrors={confirmed}
              submitButtonText="Create Recommendation"
              elements={() => (
                <React.Fragment>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="What's the name of this place?"
                      onBlur={this.findPlace}
                    />
                    <CreateRecListing
                      recommendationListing={this.state.recommendationListing}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Tell others about what makes it great"
                      value={description}
                      onChange={this.change}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Location"
                      onChange={this.change}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { id } = this.props.match.params;
    const { token, data } = this.props.context;
    const { title, description, location, lastVisited } = this.state;
    const rec = { title, description, location, lastVisited };
    data.createRecommendation(token, rec, id).then(errors => {
      if (errors) {
        this.setState({ errors });
      } else {
        notify.show('Recommendation Created!', 'success', 10000);
        this.props.history.push(`/category/${id}/recs`);
      }
    });
  };

  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/category/${id}/recs`);
  };
}
