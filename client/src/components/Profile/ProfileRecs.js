import React from 'react';
import { ListGroupItem, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const ProfileRec = ({ recommendations }) => {
  return recommendations.map(rec => (
    <ListGroupItem key={rec.id}>
      <CardTitle>{rec.title}</CardTitle>
      <Card.Text>Location: {rec.location}</Card.Text>
      <Card.Text>Description: {rec.description}</Card.Text>
      <Button variant="info" href={`/category/${rec.id}/recs/update`}>
        Edit
      </Button>
      <Button className="float-right" variant="danger">
        Delete
      </Button>
    </ListGroupItem>
  ));
};

const CardTitle = styled(Card.Title)`
  color: blue;
  font-size: 20px;
`;

export default ProfileRec;

// title color blue as an H1 or H2
// date-created smaller text
