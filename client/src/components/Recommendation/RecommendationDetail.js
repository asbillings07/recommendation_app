import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Container, Col, Row, Card } from 'react-bootstrap';
import Rating from '../Recommendation/Rating';
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
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col xs md lg="auto">
              <Card style={{ width: '60rem', height: '30rem' }}>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle className="mb-1 text-muted">
                    {location}
                  </Card.Subtitle>
                  <Card.Text>What's it about: {description}</Card.Text>
                </Card.Body>
              </Card>
              <Rating rating={rating} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
