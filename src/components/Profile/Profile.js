import React, { useEffect, useState, useCallback } from 'react'
// import avatar from '../../images/imgholdr-image.png';
import ProfileRecommendation from './ProfileRecs'
import UserProfileInfo from './ProfileInfo'
import ProfilePhotoModal from './ProfilePhotoModal'
import { getUserById } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Image, CloudinaryContext } from 'cloudinary-react'
import styled from 'styled-components'

export const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  // const [user, setUser] = useState({})
  const [recommendation, setRecommendation] = useState([])
  // const [selectedFile, setSelectedFile] = useState('');
  const [photo, setPhoto] = useState('sample')
  const [showModal, setShowModal] = useState(false)

  const fetchData = useCallback(() => {
    dispatch(getUserById())
    // try {
    //   const user = await context.data.getUserById()
    //   console.log(user)
    //   if (user) {
    //     setUser(user)
    //     setRecommendation(user.Recommendations)
    //   }
    // } catch (err) {
    //   console.log(err.response)
    // }
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const profilePhotos = [
    {
      photoName: 'Ninja Turtle Avatar',
      photoUrl: 'https://res.cloudinary.com/hw8mbm47q/image/upload/v1568401759/ninja-turtle.png'
    },
    {
      photoName: 'Penguin Avatar',
      photoUrl: 'https://res.cloudinary.com/hw8mbm47q/image/upload/v1568401755/penguin-avatar.png'
    },
    {
      photoName: 'Fox Avatar',
      photoUrl: 'https://res.cloudinary.com/hw8mbm47q/image/upload/v1568401753/fox-avatar.png'
    },
    {
      photoName: 'Ninja Avatar',
      photoUrl: 'https://res.cloudinary.com/hw8mbm47q/image/upload/v1568401753/ninja-avatar.png'
    }
  ]

  return (
    <CloudinaryContext cloudName='demo'>
      <StyledContainer>
        <Row>
          <Col sm={4}>
            <StyledCard aria-label='profile description'>
              <StyledImage
                publicId={user.imageId ? user.imageId : photo}
                width='286'
                crop='scale'
              />
              <Card.Body>
                <Card.Text>
                  This is your profile. You can reset your password, view and manage all of the
                  recommendations you have created and choose a profile Avatar
                </Card.Text>

                <Button onClick={() => setShowModal(true)} variant='primary'>
                  Update Profile Avatar
                </Button>
              </Card.Body>
            </StyledCard>
            <UserProfileInfo user={user} />
          </Col>

          <StyledCol sm={8}>
            <h1>Manage Recommendations</h1>
            <ProfileRecommendation
              recommendations={recommendation}
              // context={context}
              onRefresh={fetchData}
            />
          </StyledCol>
        </Row>
      </StyledContainer>
      <ProfilePhotoModal
        profilePhotos={profilePhotos}
        setModal={setShowModal}
        showModal={showModal}
        setPhoto={setPhoto}
        // context={context}
        refresh={fetchData}
      />
    </CloudinaryContext>
  )
}

const StyledContainer = styled(Container)`
  position: relative;
  margin-top: 10px;
`

const StyledCard = styled(Card)`
  width: 18rem;
  margin-bottom: 20px;
`
const StyledCol = styled(Col)`
  height: 43rem;
  width: 33rem;
  overflow: scroll;
`
const StyledImage = styled(Image)`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
`

// const addProfilePhoto = () => {
//   const data = new FormData();
//   data.append('file', selectedFile);
//   axios.post(`${Config.apiBaseUrl}/profile-upload`, data).then(res => {
//     if (res.data) {
//       console.log(res.data);
//     }
//   });
// };
