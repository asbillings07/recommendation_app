import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const AddRecommendation = ({ id }) => {
  return (
    <AddRecCard>
      <Card.Body>
        <Button
          href={`/category/${id}/rec-create`}
          variant="primary"
          className="mt-5"
        >
          Create Recommendation
        </Button>
      </Card.Body>
    </AddRecCard>
  );
};

export default AddRecommendation;

const AddRecCard = styled(Card)`
  height: 11.25rem;
  margin-top: 20px;
  width: 18rem;
  margin-left: 20px;
  align-items: center;
`;
