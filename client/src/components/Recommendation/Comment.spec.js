import React from 'react';
import Comment from './Comment';
import { render, cleanup, fireEvent } from '@testing-library/react';

describe('<Comment/>', () => {
  beforeEach(() => {
    cleanup();
  });
  jest.spyOn(console, 'error');

  const props = {
    comments: [
      'testing, testing, 123',
      'gotta have that kit-kat bar',
      'test that react component',
    ],

    id: 1,
    token: '1234555',
    authedUser: 'Aaron Billings',
  };

  it('does not show comment form if user is not signed in', () => {
    const { debug, queryByTestId } = render(
      <Comment
        comments={props.comments}
        id={props.id}
        token={props.token}
        authedUser={null}
      />
    );
    expect(console.error).toHaveBeenCalled();
    expect(queryByTestId('comment-form')).not.toBeTruthy();
  });
  it('Shows the comment form if user is signed in', () => {
    const { debug, getByTestId } = render(
      <Comment
        comments={props.comments}
        id={props.id}
        token={props.token}
        authedUser={props.authedUser}
      />
    );
    expect(console.error).toHaveBeenCalled();
    expect(getByTestId('comment-form')).toBeTruthy();
    debug();
  });
});
