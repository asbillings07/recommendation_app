import React from 'react';
import styled from 'styled-components';
const NotFound = () => {
  return (
    <Container>
      <div className="bounds">
        <Padding>
          <Button href="/">Home</Button>
        </Padding>
        <Heading>Not Found</Heading>
        <Text>Sorry! We couldn't find the page you're looking for.</Text>

        <iframe
          src="https://giphy.com/embed/NTXqH1bUCfHBS"
          title="not found"
          width="480"
          height="322"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </div>
    </Container>
  );
};

const Button = styled.a`
  backgroud: transparent;
  border-radius: 3px;
  border: 2px solid lightblue;
  color: blue;
  margin: 0 1em;
  padding: 0.25em 1em;

  &:hover {
    background: blue;
    color: white;
  }
`;

const Container = styled.div`
  text-align: center;
`;

const Padding = styled.div`
  padding: 15px;
`;

const Text = styled.p`
  color: red;
  font-size: 25px;
`;
const Heading = styled.h1`
  color: red;
`;

export default NotFound;
