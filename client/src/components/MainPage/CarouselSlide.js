import React from 'react';
import { Carousel } from 'react-bootstrap';
import city2 from '../../images/city2.jpg';
import city3 from '../../images/city3.jpg';
import city4 from '../../images/city4.jpg';
import city5 from '../../images/city5.jpg';
import styled from 'styled-components';

export default function CarouselSlide({ authUser }) {
  return (
    <Carousel>
      <Carousel.Item>
        <StyledImg src={city5} alt="First slide" />
        <Carousel.Caption>
          {authUser ? (
            <h1>Welcome, {authUser.firstName}!</h1>
          ) : (
            <h1>Welcome, User!</h1>
          )}

          <p>Browse Recommendations or create your own!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImg src={city3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImg src={city4} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const StyledImg = styled.img`
  display: block;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
`;
