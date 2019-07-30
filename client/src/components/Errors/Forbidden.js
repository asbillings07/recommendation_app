import React from 'react';
import styled from 'styled-components';

const Forbidden = () => {
  return (
    <Container>
      <div className="bounds">
        <Heading>Forbidden</Heading>
        <Padding>
          <Button href="/">Home</Button>
        </Padding>
        <Text>
          Uh oh! You can't access this page. Hit the home button to go back.
        </Text>
        <iframe
          src="https://giphy.com/embed/wxYgRoM7xDHP2"
          width="480"
          height="273"
          frameBorder="0"
          title="lost"
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
export default Forbidden;
