import { Button } from 'react-bootstrap'
import { teal } from '../utils'
import styled from 'styled-components'

export const CategoryListButton = styled(Button)`
  outline-color: ${teal} !important;
  margin-bottom: 0.25em;

  :hover {
    background-color: ${teal} !important;
    box-shadow: 0px 11px 13px -2px rgba(32, 44, 121, 0.65), 0px 20px 20px -26px rgb(0, 0, 0);
  }
`
