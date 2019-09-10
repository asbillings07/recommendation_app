import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CarouselSlide from './CarouselSlide';
describe('the carousel', () => {
  afterEach(() => {
    cleanup();
  });

  test('<CarouselSlide/>', () => {
    const { queryAllByText } = render(<CarouselSlide />);

    expect(queryAllByText('first slide caption says')).toBeTruthy();
    expect(queryAllByText('second slide caption says')).toBeTruthy();
    expect(queryAllByText('third slide caption says')).toBeTruthy();
  });
});
