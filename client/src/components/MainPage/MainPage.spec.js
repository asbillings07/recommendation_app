import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from '../../Context';
import Home from './Home';
import CarouselSlide from './CarouselSlide';
import Navigation from './Navigation';
import CategoryList from './CategoryList';
import SearchBar from './SearchBar';
import { MemoryRouter } from 'react-router-dom';
import { categories } from '../../data/mockCategory';

global.console.error = jest.fn();

describe('All components in on the Main(landing) page render correctly', () => {
  afterEach(cleanup);
  const context = {
    authorizedUser: {
      firstName: 'Aaron',
      lastName: 'Billings',
    },
  };

  const category = [
    {
      id: 1,
      title: 'Resturant',
      Recommendations: [],
    },
    {
      id: 2,
      title: 'Outdoor Activities',
      Recommendations: [],
    },
    {
      id: 3,
      title: 'Automotive',
      Recommendations: [],
    },
  ];

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

  test('<SearchBar/>', () => {
    const setCategories = jest.fn();

    const { debug, getByPlaceholderText } = render(
      <SearchBar setCategories={setCategories} />
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
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

  test('<CategoryList/>', () => {
    const setCategories = jest.fn();
    const { queryByLabelText, getAllByTestId } = render(
      <MemoryRouter>
        <CategoryList setCategories={setCategories} categories={categories} />
      </MemoryRouter>
    );

    expect(queryByLabelText(`navigate to ${category.title}`));
    expect(getAllByTestId('category-link')).toBeTruthy();
  });
});
