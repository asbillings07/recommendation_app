import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from '../../Context';
import Home from './Home';
import CarouselSlide from './CarouselSlide';
import Navigation from './Navigation';

global.fetch = require('jest-fetch-mock');

describe('All components in <Home/> renders correctly', () => {
  afterEach(cleanup);
  const context = {
    authorizedUser: {
      firstName: 'Aaron',
      lastName: 'Billings',
    },
  };
  test('<Home/>', () => {
    const { container } = render(
      <Provider>
        <Home context={context} />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('<CarouselSlide/>', () => {
    const { queryAllByText } = render(<CarouselSlide />);

    expect(queryAllByText('first slide caption says')).toBeTruthy();
    expect(queryAllByText('second slide caption says')).toBeTruthy();
    expect(queryAllByText('third slide caption says')).toBeTruthy();
  });

  test('<Navigation/>', () => {
    const { queryAllByLabelText } = render(<Navigation context={context} />);
    expect(queryAllByLabelText('App Title is RecommendIt')).toBeTruthy();
    expect(
      queryAllByLabelText(`Welcome, ${context.authorizedUser.firstName}!`)
    ).toBeTruthy();
    expect(
      queryAllByLabelText('This link displays the Profile page')
    ).toBeTruthy();
    expect(queryAllByLabelText('This link logs you out')).toBeTruthy();
  });
});
