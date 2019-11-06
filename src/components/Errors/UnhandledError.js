import React from 'react';
import styled from 'styled-components';

const UnhandledError = () => {
  return (
    <Container className="mt-5">
      <div>
        <Space>
          <Button href="/">Home</Button>
        </Space>
        <Heading>Error</Heading>
        <Text>Sorry! We just encountered an unexpected error.</Text>
        <iframe
          src="https://giphy.com/embed/AgPiUxdXWlSEig908v"
          width="480"
          height="480"
          title="error"
          frameBorder="0"
          className="giphy-embed"
          href="https://giphy.com/gifs/trippy-abstract-pi-slices-AgPiUxdXWlSEig908v"
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-bottom: 5px;
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
