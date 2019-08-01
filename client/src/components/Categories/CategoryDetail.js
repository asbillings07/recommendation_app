import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Row, Button, Card, CardGroup } from 'react-bootstrap';
import AddRecommendation from '../Recommendation/AddRecomendation';

class CategoryDetail extends Component {
  state = {
    firstName: '',
    lastName: '',
    category: [],
    message: '',
  };

  componentDidMount() {
    this.getCategory();
  }
  // function pulls only the requested category from the API
  getCategory = async () => {
    const { id } = this.props.match.params;
    try {
      const data = await Axios.get(`${Config.apiBaseUrl}/category/${id}`);

      if (data) {
        this.setState({ category: data.data.category[0].Recommendations });
      } else {
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  showCategory = () => {
    const { category } = this.state;
    return category.map(rec => (
      <Card className="text-center" key={rec.id} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{rec.title}</Card.Title>
          <Card.Text>{rec.description}</Card.Text>
          <Button href={`/rec/${rec.id}`} variant="primary">
            Check it out
          </Button>
        </Card.Body>
      </Card>
    ));
  };

  render() {
    const { authorizedUser } = this.props.context;

    return (
      <>
        <CardGroup>
          <Row>{this.showCategory()}</Row>
        </CardGroup>
        {authorizedUser ? <AddRecommendation /> : ''}
      </>
    );
  }
}

export default CategoryDetail;
