import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../Config';
import { Card } from 'react-bootstrap';

export class Profile extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const data = await axios.get(`${Config.apiBaseUrl}/users`, {
      headers: { Authorization: 'bearer ' + this.props.context.token },
    });

    if (data) {
      this.setState({
        user: data.data,
      });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}
