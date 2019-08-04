import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const AddRecommendation = ({ id }) => {
  return (
    <AddRecButton href={`/category/${id}/rec-create`} variant="primary">
      Create Recommendation
    </AddRecButton>
  );
};

export default AddRecommendation;

const AddRecButton = styled(Button)`
  height: 11.25rem;
  margin-top: 20px;
  width: 18rem;
  margin-left: 20px;
`;
