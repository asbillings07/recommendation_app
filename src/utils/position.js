import { css } from 'styled-components'

export const fixed = ({ x = 0, y = 0, yProp = 'top', xProp = 'left' } = {}) => css`
  position: fixed;
  ${yProp}: ${y};
  ${xProp}: ${x};
  width: 100%;
`
export const absolute = ({ x = 0, y = 0, yProp = 'top', xProp = 'left' } = {}) => css`
  position: absolute;
  ${yProp}: ${y};
  ${xProp}: ${x};
  width: 100%;
`
