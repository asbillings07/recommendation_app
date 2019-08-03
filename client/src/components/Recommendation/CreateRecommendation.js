import React, { Component } from 'react';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import Axios from 'axios';
export default class CreateRecommendation extends Component {
  state = {
    title: '',
    description: '',
    lastVisited: '2019-08-02',
    location: '',
    query: '',
    rating: '',
    userid: '',
    locationId: '',
    recid: '',
    errors: [],
    confirmed: true,
  };

  onQuery = e => {
    const query = e.target.value;
    if (query.length > 0) {
      Axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json', {
        params: {
          app_id: `${process.env.REACT_APP_ID}`,
          app_code: `${process.env.REACT_APP_CODE}`,
          query: query,
          maxresults: 10,
        },
      }).then(response => {
        const address = response.data.suggestions[0].address;
        const coords = response.data.suggestions[0];
        const id = response.data.suggestions[0].locationId;
        console.log(coords);
        const location = `${address.houseNumber} ${address.street}. ${
          address.city
        }, ${address.state} ${address.postalCode}`;

        this.setState({
          location: location,
          query: query,
          locationId: id,
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
                      value={title}
                      onChange={this.change}
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
                      placeholder="What's the address?"
                      onBlur={this.onQuery}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="location"
                      value={location}
                      placeholder={location}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Label>Last Visited</Form.Label>
                  <Form.Group>
                    <Form.Control
                      type="date"
                      name="lastvisted"
                      value={lastVisited}
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
        this.props.history.push(`/category/${id}`);
      }
    });
  };

  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/category/${id}`);
  };
}
