import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import { Profile } from './Profile';
import { Provider } from '../../Context';
import ProfileInfo from './ProfileInfo';
import ProfileRecs from './ProfileRecs';
import ProfileEdit from './ProfileEdit';
import ProfileModal from './ProfileModal';

describe('Profile with all of its children render correctly', () => {
  afterEach(cleanup);

  const context = {
    token: '123456789',
  };
  const recommendations = [
    {
      id: 1,
      categoryId: 2,
      userid: 13,
      title: 'Test Recommendation 1',
      location: '125 main Street',
      description: 'test description 1',
    },
    {
      id: 2,
      categoryId: 2,
      userid: 13,
      title: 'New Test Recommendation 2',
      location: '124 main Street',
      description: 'test description 2',
    },
    {
      id: 3,
      categoryId: 2,
      userid: 13,
      title: 'Test Recommendation 3',
      location: '123 main Street',
      description: 'test description 3 ',
    },
  ];
  const user = {
    firstName: 'Aaron',
    lastName: 'Billings',
    email: 'test@test.com',
    confirmed: true,
  };

  test('<Profile/>', () => {
    const { queryByLabelText } = render(
      <Provider>
        <Profile />
      </Provider>
    );
    expect(queryByLabelText('profile description')).toBeTruthy();
  });

  test('<ProfileInfo/>', () => {
    const { queryByLabelText, getByText } = render(<ProfileInfo user={user} />);
    // ensure user profile information renders
    expect(queryByLabelText('Update Profile Information')).toBeTruthy();
    expect(
      queryByLabelText(`The first name is ${user.firstName}`)
    ).toBeTruthy();
    expect(queryByLabelText(`The last name is ${user.lastName}`)).toBeTruthy();
    expect(queryByLabelText(`The email is ${user.email}`)).toBeTruthy();
    expect(
      queryByLabelText(
        `Your email is ${user.confirmed ? 'CONFIRMED' : 'NOT CONFIRMED'}`
      )
    ).toBeTruthy();
    // ensure links are correct
    expect(getByText('Edit Profile Info').getAttribute('href')).toBe(
      '/profile/edit'
    );
    expect(getByText('Reset Password').getAttribute('href')).toBe(
      '/forgotpassword'
    );
    // ensure button fires correctly

    fireEvent.click(getByText('Edit Profile Info'));
    fireEvent.click(getByText('Reset Password'));
  });

  test('<ProfileRecs/>', () => {
    const { queryAllByLabelText, queryAllByText } = render(
      <ProfileRecs recommendations={recommendations} />
    );

    // ensure title, location and description render
    expect(queryAllByLabelText(`The title of the recommendation`)).toBeTruthy();
    expect(
      queryAllByLabelText(`The location of the recommendation `)
    ).toBeTruthy();
    expect(
      queryAllByLabelText(`The description of the recommendation`)
    ).toBeTruthy();

    // expect(getAllByText('Edit').getAttribute('href')).toBe(`/recs/update`);
    expect(queryAllByText('Delete')).toBeTruthy();
    //fireEvent.click(queryAllByText('Edit'));
  });

  test('<ProfileEdit/>', () => {
    const { container } = render(
      <Provider>
        <ProfileEdit context={context} user={user} />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
