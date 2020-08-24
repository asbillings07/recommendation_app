import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteRecommendation } from '../../Store/slices/recommendationSlice'
import { notify } from 'react-notify-toast'
import { useDispatch, useSelector } from 'react-redux'
export default function ProfileModal({ showModal, setModal, recId, refresh }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.users)
  const { recDeleted } = useSelector((state) => state.recs)
  const handleClose = () => setModal(false)

  useEffect(() => {
    if (recDeleted) {
      notify.show('Recommendation Deleted!', 'danger', 10000)
      refresh()
    }
  }, [recDeleted, refresh])

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
              dispatch(deleteRecommendation(token, recId))
            }}
          >
            Yes, do it
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
