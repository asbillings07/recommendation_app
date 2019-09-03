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
        <ConfirmedSubtitle className="mb-3">
          Email Status: {user.confirmed ? 'CONFIRMED' : 'NOT CONFIRMED'}{' '}
        </ConfirmedSubtitle>
        <Button variant="outline-info" className="mr-2" href="/profile/edit">
          Edit Profile Info
        </Button>
        <Button variant="outline-warning" href="/forgotpassword">
          Reset Password
        </Button>
      </Card.Body>
    </StyledCard>
  );
};

export default ProfileInfo;

const StyledCard = styled(Card)`
  width: 18rem;
`;

const ConfirmedSubtitle = styled(Card.Subtitle)`
  ${props => (props.confirmed ? 'color: red;' : 'color: green;')}
`;
