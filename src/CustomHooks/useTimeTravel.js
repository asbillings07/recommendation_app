import { useReducer } from 'react'

const UNDO = 'UNDO'
const REDO = 'REDO'

export const useTimeTravelReducer = (reducer, initialState) => {
  const timeTravelState = {
    past: [],
    present: initialState,
    future: []
  }

  const timeTravelReducer = (state, action) => {
    const newPresent = reducer(state.present, action)

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      }
    }

    if (action.type === REDO) {
      const [newPresent, ...newFuture] = state.future
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture
      }
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    }
  }

  return useReducer(timeTravelReducer, timeTravelState)
}
