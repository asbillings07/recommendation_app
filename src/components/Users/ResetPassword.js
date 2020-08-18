/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { resetUserPassword, updatedUserPassword } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Forms from '../Forms'
import { Form, Container, Row, Col } from 'react-bootstrap'
import { Spinner } from '../Spinner.js'
import { AlertUser } from '../AlertUser'

export default function ResetPassword({ match, history }) {
  const dispatch = useDispatch()
  const { userEmail, errorMessage, loading, errorStatus, resetSuccess } = useSelector(
    (state) => state.users
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [errors, setErrors] = useState('')
  const [updated, setUpdated] = useState(false)
  const [confirmed] = useState(true)

  // const resetUserPassword = async () => {
  //   const { token } = match.params;
  //   console.log(token);
  //   await Axios.get(`${Config.apiBaseUrl}/reset`, {
  //     params: {
  //       resetPasswordToken: token,
  //     },
  //   }).then(res => {
  //     console.log(res);
  //     if (res.data.message === 'successful') {
  //       setEmail(res.data.email);
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //       setError(true);
  //       setErrors('Password Token Expired');
  //     }
  //   });
  // };

  // run our function as soon as the browser loads
  useEffect(() => {
    const { token } = match.params
    console.log(token)
    dispatch(resetUserPassword(token))
  }, [])

  useEffect(() => {
    if (resetSuccess) setUpdated(true)
  }, [resetSuccess])

  // helper functions

  const submit = () => {
    const user = {
      userEmail,
      password
    }

    if (confirmPassword === password) {
      dispatch(updatedUserPassword(user))
    } else {
      setErrors({ errors: ['Passwords must match'] })
    }
  }

  const cancel = () => {
    history.push('/')
  }

  if (errorStatus) {
    return (
      <>
        <AlertUser
          heading={errorMessage[0]}
          type='danger'
          text='Aww shoot! It looks like your reset password token has expired.
                This usually happens if you wait too long to follow the link in
                your email. No worries, you can still reset your password with
                another token. Please press the link below to get another reset
                 password link. Remember your token does expire within 24 hours.'
          link='/forgotpassword'
          linkText='Reset Password'
        />
      </>
    )
  } else if (loading) {
    return <Spinner size='4x' />
  } else if (updated) {
    return (
      <>
        <AlertUser
          heading='Password Reset Successfully'
          text='Your password has been reset succesfully. Follow the link to sign in with your new password.'
          linkText='Sign In'
          link='/signin'
          type='success'
        />
      </>
    )
  } else {
    return (
      <Container className='mt-3'>
        <Row className='justify-content-md-center'>
          <Col xs md lg='auto'>
            <h1>Reset Password</h1>
            <Forms
              cancel={cancel}
              errors={errors}
              passwordErrors={confirmed}
              submit={submit}
              submitButtonText='Update Password'
              elements={() => (
                <React.Fragment>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Control
                      type='password'
                      name='password'
                      value={password}
                      placeholder='password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Control
                      type='password'
                      name='confirmPassword'
                      value={confirmPassword}
                      placeholder='confirm password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </React.Fragment>
              )}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
