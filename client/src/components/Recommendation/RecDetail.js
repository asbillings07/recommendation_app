import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Spinner from '../Spinner';
import Comment from './Comment';
import Rating from './Rating';
import {
  Container,
  Row,
  Card,
  Col,
  ListGroup,
  ButtonToolbar,
  ListGroupItem,
} from 'react-bootstrap';
import AddRecommendation from './AddRecomendation';
import MapContainer from '../Map/MapContainer';
import styled from 'styled-components';

export default class RecDetail extends Component {
  state = {
    recs: [],
    loading: true,
    selectedRec: {},
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
          loading: false,
        });
      } else {
        this.props.history.push('/notfound');
      }
    } catch (err) {
      console.log(err);
      //   this.props.history.push('/notfound');
    }
  };

  // Need to figure out how to make it so that when each of these are clicked the location shows on the map?
  showAllRecs = () => {
    const { recs } = this.state;
    return recs.map(rec => (
      <ListGroupItem
        key={rec.id}
        action
        onClick={() => this.setState({ selectedRec: rec })}
      >
        <Card.Title>{rec.title}</Card.Title>
        <Card.Subtitle className="mt-2 text-muted">
          {rec.location}
        </Card.Subtitle>
        <Card.Text>{rec.description}</Card.Text>
        {/* <Rating /> */}
        <Card.Text>
          Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}
        </Card.Text>
      </ListGroupItem>
    ));
  };

  render() {
    const { authorizedUser, token } = this.props.context;

    const { selectedRec, loading, comments } = this.state;

    if (loading) return <Spinner size="8x" spinning="spinning" />;

    return (
      <StyledContainer>
        <Row>
          <StyledCol>
            <Card>
              <AddRecommendation id={this.props.match.params.id} />
              <ListGroup>{this.showAllRecs()}</ListGroup>
            </Card>
          </StyledCol>
          <Col>
            <MapContainer selectedRec={selectedRec} />
          </Col>
        </Row>

        <Comment
          comments={selectedRec.Comments}
          token={token}
          id={selectedRec.id}
          authedUser={authorizedUser}
        />
      </StyledContainer>
    );
  }
}

const StyledCol = styled(Col)`
  width: 100vw;
  height: 78vh;
  padding-right: 0px !important;
  overflow: scroll;
`;
const StyledContainer = styled(Container)`
  margin-left: -1px !important;
  margin-top: 0.25rem;
`;
