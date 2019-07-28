import React, { Component } from 'react';
import CategoryList from '../components/Categories/CategoryList';
import CategoryTopTen from '../components/Categories/CategoryTopTen';
import SearchBar from './SearchBar';
import { Jumbotron, Container } from 'react-bootstrap';

// Pulls in mock json data
let mockData = require('../data/mockCategory.json');
class Home extends Component {
  state = {
    data: mockData,
  };

  render() {
    const authUser = this.props.context.authorizedUser;

    return (
      <div className="container">
        <Jumbotron className="jumbo-bk" fluid>
          <Container>
            {authUser ? (
              <h1>Welcome, {authUser.firstName}!</h1>
            ) : (
              <h1>Welcome, User!</h1>
            )}

            <p>Browse Recommendations or create your own!</p>
          </Container>
        </Jumbotron>
        <SearchBar />

        <CategoryList categories={this.state.data} />
      </div>
    );
  }
}

export default Home;
