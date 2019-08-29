import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Forms from '../Forms'
import {Form, Container, Row, Col} from 'react-bootstrap'


const ProfileEdit = () => {

const [profileInfo, setProfileInfo] = useState({})
const [errors, setErrors] = useState([])

useEffect(() => {

}, [])

const cancel = () => {
    this.props.history.push(`/profile`);
  };

return (

<Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col xs md lg="auto">
            <>
              <h1 className="mb-4">Update Your Recommendation</h1>
              <Forms
                cancel={cancel}
                errors={errors}
                submit={this.submit}
                passwordErrors={confirmed}
                submitButtonText="Update Profile"
                elements={() => (
                  <React.Fragment>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder=""
                        value={title}
                        onChange={this.change}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder=""
                        value={}
                        onChange={this.change}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="location"
                        value={}
                        placeholder=""
                        onChange={this.change}
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

export default ProfileEdit