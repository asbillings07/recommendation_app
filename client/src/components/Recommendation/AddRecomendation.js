import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AddRecommendation = () => {
  return (
    <Card style={{ width: '17rem' }}>
      <Card.Body>
        <Button href="/rec-create" variant="primary">
          Create Recommendation
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AddRecommendation;
