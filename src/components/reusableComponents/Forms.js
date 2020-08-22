import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

export const Forms = ({
  cancel,
  errors,
  submit,
  submitButtonText,
  elements,
  buttons,
  button,
  passwordErrors
}) => {
  function handleSubmit(event) {
    event.preventDefault()
    submit()
  }

  function handleCancel(event) {
    event.preventDefault()
    cancel()
  }

  return (
    <>
      <ErrorsDisplay errors={errors} passwordErrors={passwordErrors} />
      <Form onSubmit={handleSubmit}>
        {elements()}
        {buttons ? (
          ''
        ) : (
          <>
            <Button className='mr-1' variant='primary' type='submit' style={{ width: '13rem' }}>
              {submitButtonText}
            </Button>
            <Button className='mr-1' variant='secondary' onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Form>
    </>
  )
}

function ErrorsDisplay({ errors, passwordErrors }) {
  let errorsDisplay = null

  if (errors.length) {
    errorsDisplay = (
      <>
        <ValidationLabel>Errors:</ValidationLabel>
        <ValidationUl>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ValidationUl>
      </>
    )
  } else if (!passwordErrors) {
    errorsDisplay = (
      <>
        <ValidationLabel>Errors:</ValidationLabel>
        <ValidationUl>{<li>Passwords must match</li>}</ValidationUl>
      </>
    )
  }
  return errorsDisplay
}

const ValidationUl = styled.div`
  color: red;
  padding: 15px 0 40px 10px;
`
const ValidationLabel = styled.h2`
  color: #0069c0;
  font-size: 28px;
`
