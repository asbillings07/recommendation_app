import { teal, elevation, white, darkBlue, red } from '../utils'
import styled from 'styled-components'
// import { Button } from 'react-bootstrap'
/*

*/

export const Button = styled.button`
  padding: 15px 15px;
  margin: 20px 0px;
  width: 100%;
  ${elevation[1]};
  display: flex;
  align-items: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  justify-content: space-around;
  border-radius: 5px;
  font-size: 19px;
  ${({ type }) => {
    switch (true) {
      case 'cancel': {
        return `background: ${red}
                border-color: ${red}
                color: ${white}
        `
      }
      default: {
        return `background: ${darkBlue} 
                border-color: ${darkBlue}
                color: ${white}
        `
      }
    }
  }}
`
export const CategoryListButton = styled(Button)`
  margin-bottom: 0.25em;
  span {
    margin-right: 10px;
  }
  :hover {
    background-color: ${teal};
    border-color: ${teal};
    transition: 0.3s ease box-shadow;
    ${elevation[3]}
  }
`
