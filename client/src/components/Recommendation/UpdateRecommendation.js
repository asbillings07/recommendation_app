import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import Forms from '../Forms';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

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

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
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
              elements={() => (
                <React.Fragment>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder=""
                      value={title}
                      onChange={this.change}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder=""
                      value={description}
                      onChange={this.change}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="location"
                      value={location}
                      placeholder=""
                      onChange={this.change}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
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
    const { id } = this.props.match.params;
    const { token, data } = this.props.context;
    const { title, description, location } = this.state;
    const rec = { title, description, location };
    data
      .updateRecommendation(token, rec, id)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors.message });
        } else {
          notify.show('Recommendation Updated!', 'success', 10000);
          this.props.history.push(`/rec/${id}`);
        }
      })
      .catch(error => console.log(error.message));
  };

  cancel = () => {
    const { id } = this.props.match.params;
    this.props.history.push(`/rec/${id}`);
  };
}
