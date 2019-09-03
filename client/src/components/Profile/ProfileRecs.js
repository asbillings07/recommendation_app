import React from 'react';
import { ListGroupItem, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { notify } from 'react-notify-toast';

const ProfileRec = ({ recommendations, context }) => {
  // Deletes recommendation - need to figure out how to ensure recommendations are update when one is deleted
  const deleteRecommendation = id => {
    const deleteIt = window.confirm(
      'Careful...Are you sure you want to delete this recommendation? There is no going back.'
    );
    if (deleteIt) {
      context.data.deleteRecommendation(context.token, id).then(error => {
        if (error.length) {
          console.log(error);
        } else {
          notify.show('Recommendation Deleted!', 'Danger', 10000);
        }
      });
    } else {
    }
  };

  return recommendations.map(rec => (
    <ListGroupItem key={rec.id}>
      <CardTitle>{rec.title}</CardTitle>
      <Card.Text>Location: {rec.location}</Card.Text>
      <Card.Text>Description: {rec.description}</Card.Text>
      <Button variant="info" href={`/category/${rec.id}/recs/update`}>
        Edit
      </Button>
      <Button
        onClick={() => deleteRecommendation(rec.id)}
        className="float-right"
        variant="danger"
      >
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
