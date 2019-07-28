import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
  state = {
    categories: [],
    loading: true,
  };

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = async () => {
    const categories = await Axios.get(`${Config.apiBaseUrl}/category`).catch(
      err => console.log(err)
    );
    if (categories) {
      console.log(categories.data.category);
      this.setState({ categories: categories.data.category, loading: false });
    }
  };

  showCategories = () => {
    return this.state.categories.map(category => (
      <React.Fragment key={category.id}>
        <Link to="#">
          <h4>{category.title}</h4>
        </Link>
      </React.Fragment>
    ));
  };

  render() {
    return (
      <div>
        <h5>Browse Categories</h5>
        {this.showCategories()}
      </div>
    );
  }
}

export default CategoryList;
