import React, { Component } from 'react'
import CategoryList from './CategoryList';
import CategoryTopTen from './CategoryTopTen';
import SearchBar from './SearchBar';
import '../css/home.css';

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
                <h1>Welcome Home</h1>
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