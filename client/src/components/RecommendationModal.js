import React from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

export const RecommendationModal = ({
  shouldShow,
  setShow,
  recList,
  setRec,
}) => {
  const handleClose = () => setShow(false);

  //maps through list of nearby recommendations
  const recommendationListing = () => {
    return recList.map((rec, i) => (
      <ListGroup.Item action onClick={() => setRec(rec)} key={i}>
        {rec.title}, {rec.vicinity}
      </ListGroup.Item>
    ));
  };

  return (
    <>
      <Modal show={shouldShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Places Nearby</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>{recommendationListing()}</ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
