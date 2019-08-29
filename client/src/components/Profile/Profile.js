import React, { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from '../../images/imgholdr-image.png';
import Config from '../../Config';
import ProfileRecommendation from './ProfileRecs';
import UserProfileInfo from './ProfileInfo';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroupItem,
  ListGroup,
} from 'react-bootstrap';
import styled from 'styled-components';

export const Profile = ({ context }) => {
  const [user, setUser] = useState({});
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${Config.apiBaseUrl}/users`, {
        headers: { Authorization: 'bearer ' + context.token },
      });

      if (data) {
        setUser(data.data);
        setRecommendation(data.data.Recommendations);
      }
    };

    fetchData();
  }, [context.token]);

  console.log(user);

  return (
    <StyledContainer>
      <Row>
        <Col sm={4}>
          <StyledCard>
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
              <Card.Text>
                This is your profile. You can reset your password, view and
                manage all of the recommendations you have created and much more
              </Card.Text>

              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </StyledCard>
          <UserProfileInfo user={user} />
        </Col>

        <StyledCol sm={8}>
          <h1>Your Recommendations</h1>
          <ProfileRecommendation recommendations={recommendation} />
        </StyledCol>
      </Row>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  position: relative;
`;

const StyledCard = styled(Card)`
  width: 18rem;
  margin-bottom: 20px;
`;
const StyledCardSubtitle = styled(Card.Subtitle)`
  margin-top: 3px !important;
  margin-bottom: 0px;
`;
const StyledCol = styled(Col)`
  height: 43rem;
  width: 33rem;
  overflow: scroll;
`;
