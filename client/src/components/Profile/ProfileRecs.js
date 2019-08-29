import React from 'react';
import { ListGroupItem, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const ProfileRec = ({ recommendations }) => {
  return recommendations.map(rec => (
    <ListGroupItem key={rec.id}>
      <Card.Title>{rec.title}</Card.Title>
      <Card.Title>{rec.location}</Card.Title>
      <Card.Text>{rec.description}</Card.Text>
      <Card.Subtitle className="mt-2 text-muted">
        Date Created: {new Date(rec.updatedAt).toString()}
      </Card.Subtitle>
      <Button variant="info">Edit</Button>
      <Button className="float-right" variant="danger">
        Delete
      </Button>
    </ListGroupItem>
  ));
};

export default ProfileRec;

// title color blue as an H1 or H2
// date-created smaller text
