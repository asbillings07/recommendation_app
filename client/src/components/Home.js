import React, { Component } from 'react'


// Pulls in mock json data
let mockData = require("../data/mockCategory.json")

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockData.categories,

        };
    }
    render() {
        return (
            <div>
                <h1>Welcome Home</h1>
            </div>
        )
    }
}


export default Home;