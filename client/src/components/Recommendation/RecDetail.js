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
    try {
      const data = await Axios.get(`${Config.apiBaseUrl}/recs`);

      if (data) {
        const recs = data.data;
        console.log(data.data);
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
      <React.Fragment key={rec.id}>
        <Card.Title>{rec.title}</Card.Title>
        <Card.Subtitle className="mt-2 text-muted">
          {rec.location}
        </Card.Subtitle>
        <Card.Text>{rec.description}</Card.Text>
        <Card.Text>
          Recommended by: {`${rec.User.firstName} ${rec.User.lastName}`}
        </Card.Text>
      </React.Fragment>
    ));
  };

  render() {
    const { userid, catid, recid, location, title, description } = this.state;
    const { authorizedUser } = this.props.context;
    return (
      <Container className="mt-1">
        <Row>
          <Card style={{ height: '100vh' }}>
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
                {this.showAllRecs()}
              </Card.Body>
            </Col>
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
          </Card>
          {console.log(location)}
          <MapContainer recs={this.state.recs} />
        </Row>
      </Container>
    );
  }
}

const StyledToolBar = styled(ButtonToolbar)`
  margin-left: -20px;
`;
