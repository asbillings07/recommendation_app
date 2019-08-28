import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const ProfileInfo = ({ user }) => {
  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>First Name: {user.firstName}</Card.Title>
        <Card.Title className="mb-3">Last Name: {user.lastName}</Card.Title>
        <Card.Title>Email Address: {user.email}</Card.Title>
        <Card.Subtitle className="mb-3">
          Email Status: {user.confirmed ? 'confirmed' : 'Not confirmed'}{' '}
        </Card.Subtitle>
        <ProfileInfoButton>Edit Profile Info</ProfileInfoButton>
        <ProfileInfoButton>Reset Password</ProfileInfoButton>
      </Card.Body>
    </StyledCard>
  );
};

export default ProfileInfo;

const StyledCard = styled(Card)`
  width: 18rem;
`;

const ProfileInfoButton = styled(Button)`
  margin-top: 3px;
  margin-right: 3px;
`;
