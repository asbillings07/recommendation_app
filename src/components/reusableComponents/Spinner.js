import PropTypes from 'prop-types'
import React from 'react'
import { SpinIcon, SpinnerContainer, SpinnerTitle } from '../../elements'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Spinner = ({ size, loadingMsg = 'Loading...', children }) => (
  <SpinnerContainer>
    <SpinIcon icon={faSpinner} size={size} />
    {children ? { children } : <SpinnerTitle>{loadingMsg}</SpinnerTitle>}
  </SpinnerContainer>
)

Spinner.propTypes = {
  children: PropTypes.any,
  loadingMsg: PropTypes.string,
  size: PropTypes.any.isRequired
}
