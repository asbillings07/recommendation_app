import React, { Component } from 'react'
import CategoryList from './CategoryList';
import CategoryTopTen from './CategoryTopTen';
import SearchBar from './SearchBar';
import '../css/home.css';
import { Jumbotron, Container } from 'react-bootstrap';

// Pulls in mock json data
let mockData = require("../data/mockCategory.json")
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockData,

        };
    }
    render() {

        return (
            <div className="container">
                <Jumbotron className="jumbo-bk" fluid>
                    <Container >
                        <h1>Welcome, User!</h1>
                        <p>
                            Something catchy about recommmendations here :)</p>
                    </Container>
                </Jumbotron>
                <SearchBar />
                <div className=" home-page-catergory-holder">
                    <CategoryList
                        categories={this.state.data} />
                    <CategoryTopTen />
                </div>
            </div>
        )
    }
}


export default Home;