import React from 'react';
import { Button, Modal, Card, CardGroup } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
export default function ProfileModal({
  showModal,
  setModal,
  profilePhotos,
  setPhoto,
  context,
  refresh,
}) {
  const sendAvatarToDB = photo => {
    context.data.updateUserPhoto(context.token, photo).then(error => {
      if (error.length) {
        console.log(error);
      } else {
        refresh();
        notify.show('Profile Avatar Uploaded!', 'success', 10000);
      }
    });
  };

  const handleClose = () => setModal(false);

  const showAvatars = () => {
    return profilePhotos.map((photo, i) => (
      <Card key={i}>
        <Card.Img variant="top" src={photo.photoUrl} />
        <Card.Body>
          <Card.Title>{photo.name}</Card.Title>
          <Button
            onClick={() => {
              setPhoto(photo.photoUrl);
              handleClose();
              sendAvatarToDB(photo);
            }}
            variant="primary"
          >
            Choose Avatar
          </Button>
        </Card.Body>
      </Card>
    ));
  };

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
  );
}
