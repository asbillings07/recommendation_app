import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
class CategoryDetail extends Component {
  state = {
    firstName: '',
    lastName: '',
    category: [],
    message: '',
  };

  componentDidMount() {}
  // function pulls only the requested category from the API
  getCategory = () => {};

  render() {
    return <></>;
  }
}

export default CategoryDetail;
