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
