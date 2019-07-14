import React, { Component } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-success">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>

        )
    }
}


export default SearchBar;