import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SpinIcon = styled(FontAwesomeIcon)`
  margin-bottom: 25px;
  animation: spin 1.5s infinite linear;
  svg {
    border-radius: 50%;
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`
export const SpinnerTitle = styled.h1`
  margin-top: 3px;
`

export const StarsIcon = styled.ul`
  border: 0;
  margin: 20px 0 0;
  padding: 0;
  font-size: 100%;

  li {
    float: left;
    list-style: none;
    width: 20%;
    max-width: 40px;
    line-height: 0;
    margin-bottom: 10px;
    text-align: center;
    padding: 0 5px;
    box-sizing: border-box;
  }

  li:first-child {
    margin-left: -2px;
  }

  li:hover {
    cursor: pointer;
  }
`
export const StarSVG = styled.svg`
  width: auto;
  height: 100%;
  fill: ${({ selected }) => (selected === true ? '#2d4f9a' : '#3658a25f')};
`
