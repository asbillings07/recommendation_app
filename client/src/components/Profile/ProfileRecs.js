import React, { useState, useEffect } from 'react';
import { ListGroupItem, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ProfileModal from './ProfileModal';

const ProfileRec = ({ recommendations, context, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [recid, setRecid] = useState('');

  const profileRecs = () =>
    recommendations.map(rec => (
      <ListGroupItem key={rec.id}>
        <CardTitle aria-label={`The title of the recommendation`}>
          {rec.title}
        </CardTitle>
        <Card.Text aria-label={`The location of the recommendation`}>
          Location: {rec.location}
        </Card.Text>
        <Card.Text aria-label={`The description of the recommendation`}>
          Description: {rec.description}
        </Card.Text>
        <Button variant="info" href={`/category/${rec.id}/recs/update`}>
          Edit
        </Button>
        <Button
          onClick={() => {
            setShowModal(true);
            setRecid(rec.id);
          }}
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
      <ProfileModal
        showModal={showModal}
        setModal={setShowModal}
        context={context}
        recId={recid}
        refresh={onRefresh}
      />
    </>
  );
};

const CardTitle = styled(Card.Title)`
  color: blue;
  font-size: 20px;
`;

export default ProfileRec;
