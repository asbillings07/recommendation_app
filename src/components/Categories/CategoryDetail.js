import React, { Component } from 'react';
import Axios from 'axios';
import Config from '../../Config';
import { Container, Row, Button, Col, Card } from 'react-bootstrap';
import AddRecommendation from '../Recommendation/AddRecomendation';
import styled from 'styled-components';
import Spinner from '../Spinner';

class CategoryDetail extends Component {
  state = {
    firstName: '',
    lastName: '',
    category: [],
    id: '',
    message: '',
    loading: true,
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
        this.setState({
          loading: false,
          category: data.data.category[0].Recommendations,
          id: data.data.category[0].id,
        });
      } else {
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  showCategory = () => {
    const { category } = this.state;
    return category.map(rec => (
      <CategoryCard className="text-center" key={rec.id}>
        <Card.Body>
          <Card.Title>{rec.title}</Card.Title>
          <Card.Text>{rec.description}</Card.Text>
          <Button href={`/rec/${rec.id}`} variant="primary">
            Check it out
          </Button>
        </Card.Body>
      </CategoryCard>
    ));
  };

  render() {
    const { id, loading } = this.state;

    if (loading) {
      return <Spinner size="4x" spinning="spinning" />;
    } else {
      return (
        <>
          <Container>
            <Row>
              {this.showCategory()} <AddRecommendation id={id} />
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default CategoryDetail;

const CategoryCard = styled(Card)`
  width: 18rem;
  height: auto;
  margin: 20px;
`;
