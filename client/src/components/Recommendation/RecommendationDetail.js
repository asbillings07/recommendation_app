import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Container, Row, Card, Button, ButtonGroup } from 'react-bootstrap';
import Rating from '../Recommendation/Rating';
import Map from '../Map/Map';
import notify from 'react-notify-toast';

export default class RecommendationDetail extends Component {
  state = {
    title: '',
    description: '',
    lastVisted: '',
    location: '',
    rating: '',
    userid: '',
    recid: '',
    catid: '',
    user: '',
  };

  componentDidMount() {
    this.getRecById();
  }

  getRecById = async () => {
    const { id } = this.props.match.params;
    try {
      const data = await Axios.get(`${Config.apiBaseUrl}/recs/${id}`);

      if (data) {
        const rec = data.data;
        console.log(data.data);
        this.setState({
          title: rec.title,
          description: rec.description,
          lastVisted: rec.lastvisted,
          location: rec.location,
          userid: rec.userid,
          recid: rec.id,
          catid: rec.categoryId,
          user: rec.user,
        });
      } else {
        this.props.history.push('/notfound');
      }
    } catch (err) {
      console.log(err);
      this.props.history.push('/notfound');
    }
  };

  render() {
    const { title, description, location, userid, recid, catid } = this.state;
    const { authorizedUser } = this.props.context;
    // add a Created by First Name & Last Name
    return (
      <>
        <Container className="mt-1" style={{ width: '60rem', height: '30rem' }}>
          <Row className="justify-content-center">
            <Card style={{ width: '60rem', height: '30rem' }}>
              <Card.Body>
                {authorizedUser && authorizedUser.id === userid ? (
                  <Card.Header>
                    <ButtonGroup className="mr-2">
                      <Button href={`/rec/${recid}/update`} variant="info">
                        Update
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button
                        variant="danger"
                        onClick={() => this.confirmDelete()}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Card.Header>
                ) : (
                  ''
                )}
                <Card.Header>
                  <ButtonGroup className="mr-2">
                    <Button href={`/category/${catid}`} variant="secondary">
                      Back
                    </Button>
                  </ButtonGroup>
                </Card.Header>
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

  confirmDelete = () => {
    const deleteIt = window.confirm(
      'Careful...Are you sure you want to delete this recommendation? There is no going back.'
    );
    if (deleteIt) {
      this.deleteRecommendation();
      notify.show('Recommendation Deleted!', 'Danger', 10000);
    } else {
    }
  };

  deleteRecommendation = () => {
    const { id } = this.props.match.params;
    const { data, token } = this.props.context;
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
    };

    data.deleteRecommendation(token, id).then(error => {
      if (error) {
        console.log(error);
      } else {
        notify.show('Recommendation Created!', 'success', 10000);
        this.props.history.push(from);
      }
    });
  };
}
