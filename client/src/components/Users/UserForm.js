import React from 'react';
import { Form, Button } from 'react-bootstrap/Form';
import styled from 'styled-components';

const UserForm = props => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <React.Fragment>
      <ErrorsDisplay errors={errors} />
      <Form onSubmit={handleSubmit}>
        {elements()}
        <Button variant="primary" type="submit">
          {submitButtonText}
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </React.Fragment>
  );
};

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <React.Fragment>
        <validationLabel>Errors:</validationLabel>
        <validationUl>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </validationUl>
      </React.Fragment>
    );
  }
  return errorsDisplay;
}

const validationUl = styled.div`
  color: red;
  padding: 15px 0 40px 10px;
`;
const validationLabel = styled.h2`
  color: #0069c0;
  font-size: 28px;
`;

export default UserForm;
