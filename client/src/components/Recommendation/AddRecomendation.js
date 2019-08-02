import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AddRecommendation = ({ id }) => {
  return (
    <Card style={{ width: '17rem' }}>
      <Card.Body>
        <Button href={`/category/${id}/rec-create`} variant="primary">
          Create Recommendation
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AddRecommendation;
