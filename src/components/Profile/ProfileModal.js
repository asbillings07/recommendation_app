import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { notify } from 'react-notify-toast'
import { useDispatch, useSelector } from 'react-redux'
export default function ProfileModal({ showModal, setModal, context, recId, refresh }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.users)
  const handleClose = () => setModal(false)

  // Deletes recommendation
  const deleteRecommendation = (id) => {
    context.data.deleteRecommendation(context.token, id).then((error) => {
      if (error.length) {
        console.log(error)
      } else {
        notify.show('Recommendation Deleted!', 'danger', 10000)
        refresh()
      }
    })
  }
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recommendation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this recommendation? Once this is done, there is no going
          back.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Go back
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              handleClose()
              deleteRecommendation(recId)
            }}
          >
            Yes, do it
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
