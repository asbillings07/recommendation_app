import React, { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from '../../images/imgholdr-image.png';
import Config from '../../Config';
import ProfileRecommendation from './ProfileRecs';
import UserProfileInfo from './ProfileInfo';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import styled from 'styled-components';

export const Profile = ({ context }) => {
  const [user, setUser] = useState({});
  const [recommendation, setRecommendation] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  const fetchData = async () => {
    const data = await axios.get(`${Config.apiBaseUrl}/users`, {
      headers: { Authorization: 'bearer ' + context.token },
    });

    if (data) {
      setUser(data.data);
      setRecommendation(data.data.Recommendations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProfilePhoto = () => {
    const data = new FormData();
    data.append('file', selectedFile);
    axios.post(`${Config.apiBaseUrl}/profile-upload`, data).then(res => {
      if (res.data) {
        console.log(res.data);
      }
    });
  };

  return (
    <StyledContainer>
      <Row>
        <Col sm={4}>
          <StyledCard aria-label="profile description">
            <Image
              cloudName="demo"
              publicId="sample"
              width="286"
              crop="scale"
            />
            <Card.Body>
              <Card.Text>
                This is your profile. You can reset your password, view and
                manage all of the recommendations you have created and much more
              </Card.Text>
              <Form>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={e => setSelectedFile(e.target.files[0])}
                />
              </Form>

              <Button onClick={addProfilePhoto} variant="primary">
                Upload Profile Photo
              </Button>
            </Card.Body>
          </StyledCard>
          <UserProfileInfo user={user} />
        </Col>

        <StyledCol sm={8}>
          <h1>Manage Recommendations</h1>
          <ProfileRecommendation
            recommendations={recommendation}
            context={context}
            onRefresh={fetchData}
          />
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
