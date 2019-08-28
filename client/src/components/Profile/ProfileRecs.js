import React from 'react';
import { ListGroupItem, Card, Button } from 'react-bootstrap';

const ProfileRec = ({ recommendations }) => {
  return recommendations.map(rec => (
    <ListGroupItem key={rec.id}>
      <Card.Title>{rec.title}</Card.Title>
      <Card.Subtitle className="mt-2 text-muted">{rec.location}</Card.Subtitle>
      <Card.Text>{rec.description}</Card.Text>
      <Card.Footer>
        Date Created: {new Date(rec.updatedAt).toString()}
      </Card.Footer>
      <Button variant="info">Edit</Button>
      <Button variant="danger">Delete</Button>
    </ListGroupItem>
  ));
};

export default ProfileRec;
