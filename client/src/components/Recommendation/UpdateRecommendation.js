import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Forms from '../Forms';
import { Container, Row, Col } from 'react-bootstrap';

export default class UpdateRecommendation extends Component {
  state = {
    title: '',
    description: '',
    lastVisted: '',
    location: '',
    rating: '',
    userid: '',
    errors: [],
    confirmed: true,
  };

  componentDidMount() {}

  getRecById = async () => {
    const { id } = this.props.match.params;
    const { authorizedUser } = this.props.context;
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
      } else {
        throw new Error();
      }
      if (authorizedUser.id === this.state.userid) {
      } else {
        this.props.history.push('/forbidden');
      }
    } catch (err) {
      console.log(err);
      this.props.history.push('/error');
    }
  };

  render() {
    const {
      title,
      description,
      location,
      userid,
      rating,
      errors,
      confirmed,
    } = this.state;

    return (
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <Forms
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              passwordErrors={confirmed}
              submitButtonText="Update Recommendation"
              //   elements={}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
  };

  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/courses/${id}`);
  };
}
