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
    descritpion: '',
    location: '',
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
        console.log(data.data.category[0].Recommendations);
        this.setState({
          recs,
          title: recs.title,
          description: recs.description,
          location: recs.location,
          userid: recs.userid,
          catid: recs.categoryId,
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
        {console.log(rec)}
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
    const { userid, catid, recid, location, title, description } = this.state;
    const { authorizedUser } = this.props.context;
    return (
      <Container className="mt-1">
        <StyledRow>
          <Col>
            <Card>
              <ListGroup>{this.showAllRecs()}</ListGroup>
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
          </Col>
          <MapContainer recs={this.state.recs} />
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
