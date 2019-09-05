import React from 'react';
import { Form } from 'react-bootstrap';

export const CreateRecListing = ({ recommendationListing }) => {
  const stripTags = string => {
    const strippedString = string.replace(/(<([^>]+)>)/gi, '');
    return strippedString;
  };
  const recListing = () => {
    return recommendationListing.map((rec, i) => (
      <option key={i}>
        {rec.title}, {rec.vicinity}
      </option>
    ));
  };

  return (
    <Form.Group>
      <Form.Control as="select" multiple>
        {recListing()}
      </Form.Control>
    </Form.Group>
  );
};
