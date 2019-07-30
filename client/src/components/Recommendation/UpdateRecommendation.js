import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';

export class UpdateRecommendation extends Component {
  state = {
    title: '',
    description: '',
    lastVisted: '',
    location: '',
    rating: '',
    userid: '',
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
      }
      if (authorizedUser.id === this.state.userid) {
      } else {
        this.props.history.push('/forbidden');
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return null;
  }
}
