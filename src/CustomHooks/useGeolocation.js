/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from 'react'

const error = 'ERROR'
const success = 'SUCCESS'
const started = 'STARTED'

function geoPositionReducer(state, action) {
  switch (action.type) {
    case error: {
      return {
        ...state,
        status: 'rejected',
        error: action.payload
      }
    }
    case success: {
      return {
        ...state,
        status: 'resolved',
        position: action.payload
      }
    }
    case started: {
      return {
        ...state,
        status: 'pending'
      }
    }
    default: {
      console.log(action)
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  status: 'idle',
  position: null,
  error: null
}

export const useGeolocation = () => {
  const [state, dispatch] = useReducer(geoPositionReducer, initialState)

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch({
        type: error,
        error: new Error('Geolocation is not supported')
      })
      return
    }

    dispatch({ type: started })
    const positionSuccess = (position) => {
      // console.log('GEOPOSOTIN', position)
      dispatch({ type: success, payload: position })
    }
    const positionError = (error) => dispatch({ type: error, payload: error })
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }

    const geoWatch = navigator.geolocation.watchPosition(positionSuccess, positionError, options)
    return () => navigator.geolocation.clearWatch(geoWatch)
  }, [])

  const { status, position, error } = state
  const isLoading = status === 'idle' || status === 'pending'
  const isResolved = status === 'resolved'
  const isRejected = status === 'rejected'

  return [isLoading, isResolved, isRejected, position, error]
}
