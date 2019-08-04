import React from 'react';
import useState from 'react';
import { Button, Modal } from 'react-bootstrap';

export const ShowModal = props => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this recommendation? There is no going
          back.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No Way, Take me back
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes, please
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
