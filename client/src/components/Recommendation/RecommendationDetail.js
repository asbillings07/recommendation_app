import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Container, Col, Row } from 'react-bootstrap';
export default class RecommendationDetail extends Component {
  state = {
    title: '',
    description: '',
    lastVisted: '',
    location: '',
    rating: '',
    userid: '',
  };

  componentDidMount() {
    this.getRecById();
  }

  getRecById = async () => {
    const { id } = this.props.match.params;
    try {
      const data = await Axios.get(`${Config.apiBaseUrl}/recs/${id}`);

      if (data) {
        const rec = data.data[0];
        console.log(data.data[0].rating[0]);
        this.setState({
          title: rec.title,
          description: rec.description,
          lastVisted: rec.lastvisted,
          location: rec.location,
          rating: rec.rating[0],
          userid: rec.userid,
        });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  render() {
    const { title, description, lastVisted, location, rating } = this.state;
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <h1>{title}</h1>
              <p>{description}</p>
              <p>{lastVisted}</p>
              <p>{location}</p>
              <p>{rating.rate}</p>
              <p>{rating.comment}</p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
