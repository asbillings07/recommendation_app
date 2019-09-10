import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Spinner from '../Spinner';

export default function CategoryList({ categories, loading }) {
  const showCategories = () => {
    return categories.map(category => (
      <Col className="mb-2" sm={4} key={category.id}>
        <Link data-testid="category-link" to={`/category/${category.id}/recs`}>
          <CategoryButton
            aria-label={`navigate to ${category.title}`}
            variant="outline-primary"
            size="lg"
            block
          >
            {category.title}
          </CategoryButton>
        </Link>
      </Col>
    ));
  };

  if (loading) {
    return <Spinner size="4x" spinning="spinning" />;
  } else {
    return (
      <>
        <H2 aria-label="Browse Categories">Browse Categories</H2>
        <CategoryContainer>
          <Row>{showCategories()}</Row>
        </CategoryContainer>
      </>
    );
  }
}

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-family: 'Oswald', sans-serif;
`;
const CategoryContainer = styled(Container)`
  margin-bottom: 9px;
  margin-top: 3px;
`;
const CategoryButton = styled(Button)`
  outline-color: #1168d9 !important;

  :hover {
    background-color: #1168d9 !important;
  }
`;
