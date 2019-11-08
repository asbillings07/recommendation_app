import React from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

const AddRecommendation = ({ id }) => {
  return (
    <AddRecommendationLink
      aria-label="create-recommendation-button"
      action
      href={`/category/${id}/recs/create`}
    >
      Create Recommendation
    </AddRecommendationLink>
  );
};

export default AddRecommendation;

const AddRecommendationLink = styled(ListGroup.Item)`
  height: 4rem;
  color: cadetblue !important;
`;
