import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import {
  Col,
  Row,
  Container,
  Button,
  Card,
  CardColumns,
  CardDeck,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        console.log(data.data.category[0].Recommendations);
        this.setState({ category: data.data.category[0].Recommendations });
      }
    } catch (err) {
      console.log(err);
    }
  };

  showCategory = () => {
    const { category } = this.state;
    return category.map(rec => (
      //   <Col className="mb-2" sm={4} key={rec.id}>
      //     <Link to={`/category/${rec.id}`}>
      //       <Button variant="primary" size="lg" block>
      //         {rec.title}
      //       </Button>
      //     </Link>
      //   </Col>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{rec.title}</Card.Title>
          <Card.Text>{rec.description}</Card.Text>
          <Button variant="primary">Check it out</Button>
        </Card.Body>
      </Card>
    ));
  };

  render() {
    return (
      <>
        <React.Fragment>
          <Container className="justify-content-around">
            <Row>{this.showCategory()}</Row>
          </Container>
        </React.Fragment>
      </>
    );
  }
}

export default CategoryDetail;
