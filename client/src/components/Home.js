import React, { Component } from 'react'
import CategoryList from './CategoryList';

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
            <div>
                <h1>Welcome Home</h1>
                <h2>Search Bar</h2>
                <CategoryList
                    categories={this.state.data} />
                <h4>Category deets</h4>
            </div>
        )
    }
}


export default Home;