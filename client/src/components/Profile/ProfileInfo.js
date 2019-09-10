import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function ProfileInfo({ user }) {
  return (
    <StyledCard aria-label="Update Profile Information">
      <Card.Body>
        <Card.Title aria-label={`The first name is ${user.firstName}`}>
          First Name: {user.firstName}
        </Card.Title>
        <Card.Title
          aria-label={`The last name is ${user.lastName}`}
          className="mb-3"
        >
          Last Name: {user.lastName}
        </Card.Title>
        <Card.Title aria-label={`The email is ${user.email}`}>
          Email Address: {user.email}
        </Card.Title>
        <ConfirmedSubtitle
          aria-label={`Your email is ${
            user.confirmed ? 'CONFIRMED' : 'NOT CONFIRMED'
          }`}
          className="mb-3"
        >
          Email Status: {user.confirmed ? 'CONFIRMED' : 'NOT CONFIRMED'}{' '}
        </ConfirmedSubtitle>
        <Button
          data-testid="profile-edit"
          variant="outline-info"
          className="mr-2"
          href="/profile/edit"
        >
          Edit Profile Info
        </Button>
        <Button
          data-testid="forgotpassword"
          variant="outline-warning"
          href="/forgotpassword"
        >
          Reset Password
        </Button>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 18rem;
`;

const ConfirmedSubtitle = styled(Card.Subtitle)`
  ${props => (props.confirmed ? 'color: red;' : 'color: green;')}
`;
