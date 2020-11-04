import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import { orange, white, black, elevation, fixed } from '../utils'

export const CategoryListHeading = styled.h2`
  display: flex;
  justify-content: center;
  color: ${white};
  padding: 50px 10px;
  font-size: 50px;
  font-family: 'Oswald', sans-serif;
`
export const NavDiv = styled.div`
  margin-bottom: 0px;
  ${fixed()}
  z-index: 100;
`
export const NavBar = styled(Navbar)`
  background-color: ${orange} !important;
  ${elevation[2]}
`
export const NavBarTitle = styled(NavBar.Brand)`
  color: ${white} !important;
`
export const NavLink = styled(Nav.Link)`
  color: ${({ user }) => (user ? `${black}` : `${white}`)} !important;
`
