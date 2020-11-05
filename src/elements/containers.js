import styled from 'styled-components'
import bgPic from '../images/recommend-it-bg.png'
import { Container } from 'react-bootstrap'
import { below } from '../utils'
import { Nav } from 'react-bootstrap'
import { absolute } from '../utils'

export const BackgroundImgContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  background-image: url(${bgPic}); /* The image used */
  background-color: rgba(0, 0, 0, 0.5); /* Used if the image is unavailable */
  height: 93vh; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  ${below.small`
    height: 1270px;
  `}
`
export const CategoryContainer = styled(Container)`
  margin-bottom: 9px;
  margin-top: 3px;
`
export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20em;
  align-items: center;
`
export const NavContainer = styled(Nav)`
  margin-left: auto;
`
export const LayerContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  ${absolute()};
  height: 100%;
`