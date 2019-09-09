import React, { useState } from 'react';
import { ListGroupItem, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { notify } from 'react-notify-toast';
import ProfileModal from './ProfileModal';

const ProfileRec = ({ recommendations, context }) => {
  const [showModal, setShowModal] = useState(false);

  // Deletes recommendation
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

  const profileRecs = () =>
    recommendations.map(rec => (
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

  return (
    <>
      {profileRecs()}
      <ProfileModal />
    </>
  );
};

const CardTitle = styled(Card.Title)`
  color: blue;
  font-size: 20px;
`;

export default ProfileRec;

// title color blue as an H1 or H2
// date-created smaller text
