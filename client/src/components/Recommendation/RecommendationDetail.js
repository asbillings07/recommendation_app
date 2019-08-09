import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Spinner from '../Spinner';
import {
  Container,
  Row,
  Card,
  Button,
  Col,
  ButtonToolbar,
} from 'react-bootstrap';
import Rating from '../Recommendation/Rating';
import Map from '../Map/Map';
import GMap from '../Map/GMap';
import notify from 'react-notify-toast';
import Comment from './Comment';
import styled from 'styled-components';

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
    comments: '',
    loading: true,
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
        console.log(data.data.Comments);
        this.setState({
          loading: false,
          title: rec.title,
          description: rec.description,
          lastVisted: rec.lastvisted,
          location: rec.location,
          userid: rec.userid,
          recid: rec.id,
          catid: rec.categoryId,
          user: rec.User,
          comments: rec.Comments,
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
    const {
      title,
      description,
      location,
      userid,
      recid,
      catid,
      user,
      loading,
      comments,
    } = this.state;
    const { authorizedUser } = this.props.context;
    const { id } = this.props.match.params;
    const { token, data } = this.props.context;
    // add a Created by First Name & Last Name

    if (loading) {
      return <Spinner size="4x" spinning="spinning" />;
    } else {
      return (
        <>
          <Container className="mt-1">
            <Row className="justify-content-center">
              <Card style={{ width: '100%', height: '100%' }}>
                <Col>
                  <Card.Body>
                    {authorizedUser && authorizedUser.id === userid ? (
                      <Card.Header>
                        <StyledToolBar>
                          <Button
                            href={`/category/${catid}`}
                            variant="secondary"
                            className="mr-2"
                          >
                            Back
                          </Button>
                          <Button
                            href={`/rec/${recid}/update`}
                            variant="info"
                            className="mr-2"
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => this.confirmDelete()}
                          >
                            Delete
                          </Button>
                        </StyledToolBar>
                      </Card.Header>
                    ) : (
                      <Card.Header>
                        <Button
                          href={`/category/${catid}`}
                          variant="secondary"
                          className="mb-3"
                        >
                          Back
                        </Button>
                      </Card.Header>
                    )}

                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mt-2 text-muted">
                      {location}
                    </Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>
                      Recommended by: {`${user.firstName} ${user.lastName}`}
                    </Card.Text>
                    {/* <Rating /> */}
                  </Card.Body>
                </Col>
                <Col sm={8}>
                  <Card.Body>
                    <Comment
                      comments={comments}
                      id={id}
                      token={token}
                      data={data}
                      authedUser={authorizedUser}
                    />
                  </Card.Body>
                </Col>
              </Card>
              <GMap location={location} />
            </Row>
          </Container>
        </>
      );
    }
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

const StyledToolBar = styled(ButtonToolbar)`
  margin-left: -20px;
`;
