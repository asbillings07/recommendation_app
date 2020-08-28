import React, { useState, useEffect } from 'react'
import { Forms } from '../reusableComponents'
import { getRecById, updateRecommendation } from '../../Store/slices/recommendationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Col } from 'react-bootstrap'
import { notify } from 'react-notify-toast'

export default function UpdateRecommendation({ context, match, history }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.users)
  const { recErrorMessage, rec, recUpdated } = useSelector((state) => state.recs)
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    lastVisited: '',
    location: ''
  })
  const [confirmed] = useState(true)
  const { id } = match.params

  useEffect(() => {
    dispatch(getRecById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (rec) {
      setInputs({
        title: rec.title,
        description: rec.description,
        lastVisited: rec.lastVisited,
        location: rec.location
      })
    }
  }, [rec])

  useEffect(() => {
    if (recUpdated) {
      notify.show('Recommendation Updated!', 'success', 10000)
      history.push(`/profile`)
    }
  }, [recUpdated, history])

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  const submit = () => {
    const rec = { ...inputs }
    dispatch(updateRecommendation(token, rec, id))

    // .then((errors) => {
    //   if (errors.length) {
    //     setErrors([errors])
    //   } else {
    //
    //   }
    // })
  }

  const cancel = () => {
    history.push(`/profile`)
  }

  return (
    <Container className='mt-3'>
      <Row className='justify-content-md-center'>
        <Col xs md lg='auto'>
          <>
            <h1 className='mb-4'>Update Your Recommendation</h1>
            <Forms
              cancel={cancel}
              errors={recErrorMessage}
              submit={submit}
              passwordErrors={confirmed}
              submitButtonText='Update Recommendation'
              elements={() => (
                <React.Fragment>
                  <Form.Group>
                    <Form.Control
                      aria-label='input the title of your recommendation here'
                      type='text'
                      name='title'
                      value={inputs.title}
                      onChange={(e) => handleInputs(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      aria-label='input the description of your recommendation here'
                      type='text'
                      name='description'
                      value={inputs.description}
                      onChange={(e) => handleInputs(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      aria-label='input the location of your recommendation here'
                      type='text'
                      name='location'
                      value={inputs.location}
                      onChange={(e) => handleInputs(e)}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            />
          </>
        </Col>
      </Row>
    </Container>
  )
}
