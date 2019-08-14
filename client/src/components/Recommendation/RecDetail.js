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
  ListGroup,
  ButtonToolbar,
  ListGroupItem,
} from 'react-bootstrap';
import AddRecommendation from './AddRecomendation';
import Rating from '../Recommendation/Rating';
import MapContainer from '../Map/MapContainer';
import notify from 'react-notify-toast';
import Comment from './Comment';
import styled from 'styled-components';

export default class RecDetail extends Component {
  state = {
    recs: [],
    loading: true,
    title: '',
    description: '',
    location: [],
    userid: '',
    catid: '',
  };

  componentDidMount() {
    this.getRecById();
  }

  getRecById = async () => {
    const { id } = this.props.match.params;
    try {
      const data = await Axios.get(`${Config.apiBaseUrl}/category/${id}`);

      if (data) {
        const recs = data.data.category[0].Recommendations;
        this.setState({
          recs,
          location: recs.map(rec => {
            return rec.location;
          }),
          title: recs.map(rec => {
            return rec.title;
          }),
          description: recs.map(rec => {
            return rec.description;
          }),
        });
      } else {
        this.props.history.push('/notfound');
      }
    } catch (err) {
      console.log(err);
      //   this.props.history.push('/notfound');
    }
  };

  showAllRecs = () => {
    const { recs } = this.state;
    return recs.map(rec => (
      <ListGroupItem key={rec.id}>
        <Card.Title>{rec.title}</Card.Title>
        <Card.Subtitle className="mt-2 text-muted">
          {rec.location}
        </Card.Subtitle>
        <Card.Text>{rec.description}</Card.Text>
        <Card.Text>
          Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}
        </Card.Text>
      </ListGroupItem>
    ));
  };

  render() {
    const { authorizedUser } = this.props.context;
    const { location, title, description } = this.state;
    return (
      <Container className="mt-1">
        <StyledRow>
          <Col>
            <Card>
              <ListGroup>{this.showAllRecs()}</ListGroup>
              <AddRecommendation />
            </Card>
            {/* <Col sm={8}>
                  <Card.Body>
                    <Comment
                      comments={comments}
                      id={id}
                      token={token}
                      data={data}
                      authedUser={authorizedUser}
                    />
                  </Card.Body>
                </Col> */}
            {console.log(location)}
          </Col>
          <MapContainer
            locations={location}
            recs={this.state.recs}
            title={title}
            description={description}
          />
        </StyledRow>
      </Container>
    );
  }
}

const StyledToolBar = styled(ButtonToolbar)`
  margin-left: -20px;
`;
const StyledRow = styled(Row)`
  width: 50%;
  max-height: 350px;
  overflow: scroll;
`;
