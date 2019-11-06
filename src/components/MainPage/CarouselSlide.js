import React from "react";
import { Carousel } from "react-bootstrap";
import city3 from "../../images/city3.jpg";
import city4 from "../../images/city4.jpg";
import city5 from "../../images/city5.jpg";
import styled from "styled-components";

export default function CarouselSlide() {
  return (
    <Carousel aria-label="carousel slide" className="mb-5">
      <Carousel.Item>
        <StyledImg src={city5} alt="First slide" />
        <Carousel.Caption aria-label="first slide caption says">
          <h3>Welcome to RecommendIt!</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImg src={city3} alt="Second slide" />

        <Carousel.Caption aria-label="second slide caption says">
          <h3>Browse categories for recommendations or create your own!</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImg src={city4} alt="Third slide" />

        <Carousel.Caption aria-label="third slide caption says">
          <h3>Comment on recommendations!</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const StyledImg = styled.img`
  display: block;
  width: 100vw;
  max-height: 50vh;
  overflow: hidden;
`;
