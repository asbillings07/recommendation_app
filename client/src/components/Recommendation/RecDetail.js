import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Spinner from '../Spinner';
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
        <Card.Text>
          Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}
        </Card.Text>
      </ListGroupItem>
    ));
  };

  render() {
    const { authorizedUser } = this.props;

    const { selectedRec, loading } = this.state;

    if (loading) return <Spinner size="8x" spinning="spinning" />;

    return (
      <Container className="mt-1">
        <StyledRow>
          <Col>
            <Card>
              <ListGroup>{this.showAllRecs()}</ListGroup>
              <AddRecommendation id={this.props.match.params.id} />
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
          <MapContainer selectedRec={selectedRec} />
        </StyledRow>
      </Container>
    );
  }
}

const StyledRow = styled(Row)`
  width: 50%;
  max-height: 350px;
  overflow: scroll;
`;
