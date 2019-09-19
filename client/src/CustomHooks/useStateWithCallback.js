import { useState, useEffect } from 'react';

// allows a callback function to be used in the setValue function

export const useStateWithCallback = (initialState, callback) => {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    callback(value);
  }, [value, callback]);

  return [value, setValue];
};
