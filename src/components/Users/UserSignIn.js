import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Forms from '../Forms'
import { userLogin } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Container, Row, Col } from 'react-bootstrap'

export default function UserSignIn({ context, history, location }) {
  const dispatch = useDispatch()
  const { errorMessage, userSignedIn } = useSelector((state) => state.users)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmed] = useState(true)

  const submit = async () => {
    dispatch(userLogin({ email, password }))
  }

  const cancel = () => {
    history.push('/')
  }

  useEffect(() => {
    const { from } = location.state || { from: { pathname: '/' } }
    if (userSignedIn) history.push(from)
  }, [userSignedIn, history, location.state])

  return (
    <Container className='mt-3'>
      <Row className='justify-content-md-center'>
        <Col xs md lg='auto'>
          <h1>Sign In</h1>

          <Forms
            cancel={cancel}
            errors={errorMessage}
            submit={submit}
            passwordErrors={confirmed}
            submitButtonText='Sign In'
            elements={() => (
              <>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
                    placeholder='name@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Control
                    type='password'
                    name='password'
                    value={password}
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Text className='text-muted mb-2'>
                  <Link to='/forgotpassword'>Forgot password?</Link>
                </Form.Text>
              </>
            )}
          />

          <p>
            New to RecommendIt? <Link to='/signup'>Sign up</Link>{' '}
          </p>
        </Col>
      </Row>
    </Container>
  )
}

UserSignIn.propTypes = {
  context: PropTypes.any,
  history: PropTypes.any,
  location: PropTypes.any
}
