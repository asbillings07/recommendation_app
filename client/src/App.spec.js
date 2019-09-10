import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from './Context';
import App from './App';

describe('App Component', () => {
  afterEach(() => {
    cleanup();
  });
  console.error = jest.fn();
  test('<App/> renders correctly', () => {
    const { queryByLabelText } = render(
      <Provider>
        <App />
      </Provider>
    );
    // expect(console.error).toHaveBeenCalled();
    expect(queryByLabelText('Toggle navigation')).toBeTruthy(); // ensures Nav renders
    expect(queryByLabelText('carousel slide')).toBeTruthy(); // ensures carousel slide renders
    expect(queryByLabelText('search bar')).toBeTruthy(); // ensures searchbar renders
    expect(queryByLabelText('loading page')).toBeTruthy(); // spinner renders when needed
  });
});
