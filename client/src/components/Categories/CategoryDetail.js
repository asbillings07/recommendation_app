import React, { Component } from 'react';

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
    return (
      <div>
        <h5>Top Ten Picks</h5>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
        <p>Item</p>
      </div>
    );
  }
}

export default CategoryDetail;
