import React, { useState, useEffect } from 'react'
//import styled from 'styled-components';
import { getUserById, updateUser } from '../../Store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Forms } from '../reusableComponents'
import { Form, Container, Row, Col } from 'react-bootstrap'
import { notify } from 'react-notify-toast'

const ProfileEdit = ({ history }) => {
  const dispatch = useDispatch()
  const { token, userSuccess, errorMessage, user } = useSelector((state) => state.users)
  const [inputs, setInputs] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || ''
  })

  // fetch data from database with JWT to get user info
  useEffect(() => {
    if (!user) {
      dispatch(getUserById(token))
    }
  }, [token, dispatch, user])

  useEffect(() => {}, [])

  useEffect(() => {
    if (userSuccess) {
      notify.show('Profile Updated! Name in banner will update on next login', 'success', 10000)
      history.push('/profile')
    }
  }, [userSuccess, history])

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  // submits update user info to database
  const submit = () => {
    dispatch(updateUser(token, { ...inputs }))
  }
  const cancel = () => {
    history.push(`/profile`)
  }

  return (
    <Container className='mt-3'>
      <Row className='justify-content-md-center'>
        <Col xs md lg='auto'>
          <>
            <h1 className='mb-4'>Update Your Profile</h1>
            <Forms
              cancel={cancel}
              errors={errorMessage}
              submit={submit}
              passwordErrors={true}
              submitButtonText='Update Profile'
              elements={() => (
                <>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      name='firstName'
                      placeholder=''
                      value={inputs.firstName}
                      onChange={(e) => handleInputs(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      name='lastName'
                      placeholder=''
                      value={inputs.lastName}
                      onChange={(e) => handleInputs(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      name='email'
                      value={inputs.email}
                      placeholder=''
                      onChange={(e) => handleInputs(e)}
                    />
                  </Form.Group>
                </>
              )}
            />
          </>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileEdit
