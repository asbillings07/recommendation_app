import React from 'react';
import MapContainer from './MapContainer';
import { render, cleanup } from '@testing-library/react';

describe('The Map Container and its functionality', () => {
  afterEach(cleanup);

  test('<MapContainer/>', () => {
    const { debug } = render(<MapContainer />);
  });
});
