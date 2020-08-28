import React from 'react'
import { updateUserPhoto } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Card, CardGroup } from 'react-bootstrap'
export default function ProfileModal({ showModal, setModal, profilePhotos, setPhoto, refresh }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.users)

  const handleClose = () => setModal(false)

  const showAvatars = () => {
    return profilePhotos.map((photo, i) => (
      <Card key={i}>
        <Card.Img variant='top' src={photo.photoUrl} />
        <Card.Body>
          <Card.Title>{photo.name}</Card.Title>
          <Button
            onClick={() => {
              setPhoto(photo.photoUrl)
              handleClose()
              dispatch(updateUserPhoto(token, photo))
            }}
            variant='primary'
          >
            Choose Avatar
          </Button>
        </Card.Body>
      </Card>
    ))
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Avatar</Modal.Title>
        </Modal.Header>
        <CardGroup>{showAvatars()}</CardGroup>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
