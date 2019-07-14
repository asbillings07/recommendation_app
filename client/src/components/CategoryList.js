import React, { Component } from 'react'

class CategoryList extends Component {
    render() {

        let categoryMockArray = this.props.categories.categories
        let allCategories = categoryMockArray.map(singleCategory => {
            return (<div>
                <p>{singleCategory.title}</p>
            </div>)
        })
        return (
            <div>
                {allCategories}
            </div>
        )
    }
}


export default CategoryList;