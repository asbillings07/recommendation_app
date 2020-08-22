import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Forms } from '../reusableComponents'
import { AlertUser } from '../reusableComponents'
import { forgotUserPassword } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Col } from 'react-bootstrap'

export default function ForgotPassword({ history }) {
  const dispatch = useDispatch()
  const { errorStatus, errorMessage, forgotEmailSent } = useSelector((state) => state.users)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [confirmed] = useState(true)

  const submit = () => {
    dispatch(forgotUserPassword(email))
  }

  useEffect(() => {
    if (forgotEmailSent) setSuccess(true)
  }, [forgotEmailSent])

  const cancel = () => {
    history.push('/')
  }

  if (!success) {
    return (
      <Container className='mt-3'>
        <Row className='justify-content-md-center'>
          <Col xs md lg='auto'>
            <h1>Forgot Password?</h1>
            <Forms
              cancel={cancel}
              errors={errorMessage}
              submit={submit}
              passwordErrors={confirmed}
              submitButtonText='Reset Password'
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Control
                      type='email'
                      name='email'
                      value={email}
                      placeholder='Email Address'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            />
            <p>
              Remember your password? <Link to='/signin'>Sign In</Link>
            </p>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <AlertUser
        type='success'
        heading='Reset Password link successfully sent!'
        text='YAY! Your password reset link is heading to your inbox. Make sure you click the link with 24 hours or it will expire.'
      />
    )
  }
}
