import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

class CategoryList extends Component {
  state = {
    categories: [],
    loading: true,
  };

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = async () => {
    try {
      const categories = await Axios.get(`${Config.apiBaseUrl}/category`).catch(
        err => console.log(err)
      );
      if (categories) {
        console.log(categories.data.category);
        this.setState({ categories: categories.data.category, loading: false });
      }
    } catch (err) {
      console.log(err);
      this.props.history.push('/notfound');
    }
  };

  showCategories = () => {
    return this.state.categories.map(category => (
      <Col className="mb-2" sm={4} key={category.id}>
        <Link to="#">
          <Button variant="primary" size="lg" block>
            {category.title}
          </Button>
        </Link>
      </Col>
    ));
  };

  render() {
    return (
      <React.Fragment>
        <H2>Browse Categories</H2>
        <Container className="mb-7 mt-3">
          <Row>{this.showCategories()}</Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default CategoryList;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-family: 'Oswald', sans-serif;
`;
