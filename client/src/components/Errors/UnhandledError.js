import React from 'react';
import styled from 'styled-components';

const UnhandledError = () => {
  return (
    <Container>
      <div className="bounds">
        <Space>
          <Button href="/">Home</Button>
        </Space>
        <Heading>Error</Heading>
        <Text>Sorry! We just encountered an unexpected error.</Text>
        <iframe
          src="https://giphy.com/embed/bi6RQ5x3tqoSI"
          title="error"
          width="480"
          height="349"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Space = styled.div`
  padding-bottom: 10px;
`;

const Button = styled.a`
  backgroud: transparent;
  border-radius: 3px;
  border: 2px solid blue;
  color: blue;
  margin: 0 1em;
  padding: 0.25em 1em;
  &:hover {
    background: blue;
    color: white;
  }
`;

const Text = styled.p`
  color: red;
  font-size: 25px;
`;

const Heading = styled.h1`
  color: red;
`;

export default UnhandledError;
