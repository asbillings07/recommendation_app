import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Forms } from '../reusableComponents'
import { forgotUserPassword } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Col } from 'react-bootstrap'

export default function ForgotPassword({ history }) {
  const dispatch = useDispatch()
  const { errorStatus, errorMessage } = useSelector((state) => state.users)
  const [email, setEmail] = useState('')

  const submit = () => {
    dispatch(forgotUserPassword(email))
  }

  const cancel = () => {
    history.push('/')
  }
  return (
    <Container className='mt-3'>
      <Row className='justify-content-md-center'>
        <Col xs md lg='auto'>
          <h1>Forgot Password?</h1>
          <Forms
            cancel={cancel}
            errors={errorMessage}
            submit={submit}
            passwordErrors={true}
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
}
