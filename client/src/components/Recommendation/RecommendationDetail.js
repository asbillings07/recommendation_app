import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Container, Row, Card, Button, ButtonGroup } from 'react-bootstrap';
import Rating from '../Recommendation/Rating';
import Map from '../Map/Map';

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
        console.log(data.data[0]);
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
      console.log(err);
    }
  };

  render() {
    const { title, description, location, userid, rating } = this.state;
    const { authorizedUser } = this.props.context;
    return (
      <>
        <Container className="mt-1" style={{ width: '60rem', height: '30rem' }}>
          <Row className="justify-content-center">
            <Card style={{ width: '60rem', height: '30rem' }}>
              <Card.Body>
                {authorizedUser && authorizedUser.id === userid ? (
                  <Card.Header>
                    <ButtonGroup className="mr-2">
                      <Button href="#" variant="info">
                        Update
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="danger">Delete</Button>
                    </ButtonGroup>
                  </Card.Header>
                ) : (
                  ''
                )}

                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mt-2 text-muted">
                  {location}
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Rating /* rating={} */ />
              </Card.Body>
              <Map location={location} />
            </Card>
          </Row>
        </Container>
      </>
    );
  }
}
