import { css } from 'styled-components'

const size = {
  small: 575,
  med: 960,
  large: 1140
}
// allows us to easily do media queries

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const below = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

/*
How to use:

in your css:

${above.med `
  color: blue;
`}


*/
