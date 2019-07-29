import React from 'react';
import StarRating from 'react-bootstrap-star-rating';

export const Rating = props => (
  <StarRating defaultValue={5} min={0} max={10} step={0.5} />
);
