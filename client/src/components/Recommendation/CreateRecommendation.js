import React, { Component } from 'react';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import Axios from 'axios';
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
    errors: [],
    confirmed: true,
  };

  onQuery = e => {
    const query = e.target.value;
    if (query.length > 0) {
      const address = this.getEmptyAddress();
      return this.setState({
        location: address,
      });
    }

    Axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json', {
      params: {
        app_id: process.env.REACT_APP_ID,
        app_code: process.env.REACT_APP_CODE,
        query: query,
        maxresults: 1,
      },
    }).then(response => {
      const address = response.data.suggestions[0].address;
      const id = response.data.suggestions[0].locationId;
      this.setState({
        location: address,
        query: query,
        locationId: id,
      });
    });
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
              submitButtonText="Update Recommendation"
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
                      value={location}
                      placeholder="What's the address?"
                      onChange={this.change}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="lastvisted"
                      value={lastVisited}
                      placeholder="When did you last visit the place?"
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
    const { id } = this.props.location.state;
    console.log(id);
  };

  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/category/${id}`);
  };
}
