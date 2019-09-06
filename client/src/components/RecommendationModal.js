import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export const RecommendationModal = ({ shouldShow, recList }) => {
  const handleClose = () => shouldShow(false);

  const recommendationListing = () => {
    return recList.map((rec, i) => (
      <option key={i}>
        {rec.title}, {rec.vicinity}
      </option>
    ));
  };

  return (
    <>
      <Modal shouldShow={shouldShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control as="select" multiple>
              {recommendationListing()}
            </Form.Control>
          </Form>
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
